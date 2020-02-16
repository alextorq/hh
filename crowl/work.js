const puppeteer = require('puppeteer');
const url = require('url');
const dotenv = require('dotenv');
const appRoot = require('app-root-path');

const mongoose = require('./connection');

const Vacancy = require(`${appRoot}/db/models/vacancies`);
const Category = require(`${appRoot}/db/models/categories`);
const dotenvParseVariables = require('dotenv-parse-variables');
const cliProgress = require('cli-progress');


const multibar = new cliProgress.MultiBar({
  clearOnComplete: false,
  hideCursor: true,
}, cliProgress.Presets.shades_grey);

const prepare = multibar.create(100, 0, {
  format: 'prepare [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
});
const scrabeBar = multibar.create(100, 0, {
  format: 'scrabe [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
});
const savedBar = multibar.create(100, 0, {
  format: 'saved [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
});


let env = dotenv.config({});
env = dotenvParseVariables(env.parsed);

const visible = false;


let browser;
let page;
const ignoredTypes = ['stylesheet', 'font', 'image', 'media', 'texttrack', 'manifest', 'websocket'];
const blackListDomains = ['https://mc.yandex.ru/metrika/watch.js', 'https://statad.ru/pixel.gif', 'https://spb.hh.ru/analytics', 'https://spb.hh.ru/stat?url='];

function checkInBlackList(url = '') {
  let status = false;
  for (const item of blackListDomains) {
    if (url.startsWith(item)) {
      status = true;
    }
  }
  return status;
}


async function scrapeVacancies(listOfProfessions) {
  function getVacancies(env) {
    const jobs = Array.from(document.querySelectorAll(env.PARSER_SELECTOR_VACANCIES_ITEMS));
    return jobs.map((item) => {
      const title = item.querySelector(env.PARSER_SELECTOR_VACANCIES_NAME)
                && item.querySelector(env.PARSER_SELECTOR_VACANCIES_NAME).textContent || '';
      const price = item.querySelector(env.PARSER_SELECTOR_VACANCIES_PRICE)
                && item.querySelector(env.PARSER_SELECTOR_VACANCIES_PRICE).textContent || '';
      const company = item.querySelector(env.PARSER_SELECTOR_VACANCIES_COMPANY)
                && item.querySelector(env.PARSER_SELECTOR_VACANCIES_COMPANY).href || '';
      const link = item.querySelector(env.PARSER_SELECTOR_VACANCIES_LINK)
                && item.querySelector(env.PARSER_SELECTOR_VACANCIES_LINK).href || '';

      return {
        title,
        price,
        company,
        link,
      };
    });
  }
  const allPages = listOfProfessions.reduce((accum, item) => {
    accum += item.pages.length;
    return accum;
  }, 0);

  scrabeBar.setTotal(allPages);

  for (const profession of listOfProfessions) {
    if (env.PARSER_LOG) {
      console.log(`${profession.title} page`);
    }
    for (const [index, link] of profession.pages.entries()) {
      try {
        await page.goto(link, { waitUntil: 'domcontentloaded' });
        if (env.PARSER_LOG) {
          console.log(`${index + 1} from ${profession.pages.length}`);
        }
        const jobs = await page.evaluate(getVacancies, env);
        scrabeBar.increment();
        profession.jobs.push(...jobs);
      } catch (e) {
        console.error(e);
      }
    }
  }
}


async function getPagination(listOfProfessions) {
  function getSize(env) {
    let maxSize = document.querySelector(env.PARSER_SELECTOR_PAGINATION);
    if (!maxSize) {
      maxSize = document.querySelector(env.PARSER_SELECTOR_PAGINATION_LAST_CHILD);
    }
    return maxSize && maxSize.href || null;
  }
  prepare.setTotal(listOfProfessions.length);
  for (const [index, item] of listOfProfessions.entries()) {
    const maxItemsOnPageURlPageParams = url.parse(item.link, true);
    maxItemsOnPageURlPageParams.query.items_on_page = '100';
    maxItemsOnPageURlPageParams.search = '';
    const link = url.format(maxItemsOnPageURlPageParams);
    await page.goto(link, { waitUntil: 'domcontentloaded' });
    if (env.PARSER_LOG) {
      console.log(`${index + 1} prof page from ${listOfProfessions.length}`);
    }
    // await page.waitForSelector(env.PARSER_SELECTOR_PAGINATION);

    const maxPageString = await page.evaluate(getSize, env);
    if (maxPageString) {
      const pageParams = url.parse(maxPageString, true);
      const maxPage = +pageParams.query.page;
      for (let i = 0; i <= maxPage; i++) {
        pageParams.search = '';
        pageParams.query.page = i;
        const paginationPage = url.format(pageParams);
        item.pages.push(paginationPage);
      }
    } else {
      item.pages.push(item.link);
    }
    prepare.increment();
  }
}

/* eslint max-len:0 */
async function scrapeProfessions() {
  await page.goto(env.PARSER_INIT_URL);
  await page.waitForSelector(env.PARSER_SELECTOR_PROFESSIONS_WAITFOR);

  function getProfessions(env) {
    const jobs = Array.from(document.querySelectorAll(env.PARSER_SELECTOR_PROFESSIONS_ITEMS));
    return jobs.map((item) => {
      const title = item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_NAME)
                && item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_NAME).textContent || null;
      const amount = item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_AMOUNT)
                && +item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_AMOUNT).textContent || null;
      const link = item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_LINK)
                && item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_LINK).href || null;
      return {
        title,
        amount,
        link,
        pages: [],
        jobs: [],
      };
    });
  }

  let listOfProfessions = await page.evaluate(getProfessions, env);
  listOfProfessions = listOfProfessions.filter((item) => !!item.title && !!item.amount && !!item.link);

  return listOfProfessions;
}

async function saveResult(listOfProfessions) {
  const jobs = listOfProfessions.reduce((accum, item) => {
    accum += item.jobs.length;
    return accum;
  }, 0);
  savedBar.setTotal(jobs);

  for (const profession of listOfProfessions) {
    const category = await Category.create(profession);
    for (const job of profession.jobs) {
      savedBar.increment();
      const item = Object.assign(job, { category: category._id });
      await Vacancy.create(item);
    }
  }
}

async function main() {
  browser = await puppeteer.launch({
    headless: !visible,
    args: [
      '--window-size=1920,1080',
    ],
  });
  page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (ignoredTypes.includes(req.resourceType()) || checkInBlackList(req.url())) {
      req.abort();
    } else {
      // console.log(req.resourceType())
      // console.log(req.url())
      req.continue();
    }
  });

  try {
    const profs = await scrapeProfessions();
    await getPagination(profs);
    await scrapeVacancies(profs);
    await saveResult(profs);
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
    await mongoose.connection.close();
  }
}

main();
