const puppeteer = require('puppeteer');
const {URL} = require('url');
const dotenv = require('dotenv');
const appRoot = require('app-root-path');

const mongoose = require('./connection');

const Vacancy = require(`${appRoot}/db/models/vacancies`);
const Category = require(`${appRoot}/db/models/categories`);
const Specialization = require(`${appRoot}/db/models/specialization.js`);
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
  function getVacancies(config) {
    const jobs = Array.from(document.querySelectorAll(config.PARSER_SELECTOR_VACANCIES_ITEMS));
    return jobs.map((item) => {
      const title = item.querySelector(config.PARSER_SELECTOR_VACANCIES_NAME)
                && item.querySelector(config.PARSER_SELECTOR_VACANCIES_NAME).textContent || '';
      const price = item.querySelector(config.PARSER_SELECTOR_VACANCIES_PRICE)
                && item.querySelector(config.PARSER_SELECTOR_VACANCIES_PRICE).textContent || '';
      const company = item.querySelector(config.PARSER_SELECTOR_VACANCIES_COMPANY)
                && item.querySelector(config.PARSER_SELECTOR_VACANCIES_COMPANY).href || '';
      const link = item.querySelector(config.PARSER_SELECTOR_VACANCIES_LINK)
                && item.querySelector(config.PARSER_SELECTOR_VACANCIES_LINK).href || '';

      return {
        title,
        price,
        company,
        link,
      };
    });
  }
  const jobsAmount = listOfProfessions.reduce((accum, item) => {
    const specialization = item.specialization;
    for (const specializationItem of specialization) {
      accum += specializationItem.pages.length;
    }
    return accum;
  }, 0);

  scrabeBar.setTotal(jobsAmount);

  for (const profession of listOfProfessions) {
    for (const specialization of profession.specialization) {
      for (const specializationPage of specialization.pages) {
        try {
          await page.goto(specializationPage, { waitUntil: 'domcontentloaded' });
          const jobs = await page.evaluate(getVacancies, env);
          scrabeBar.increment();
          specialization.jobs.push(...jobs);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}


async function getPagination(listOfProfessions) {
  function getSize(config) {
    let maxSize = document.querySelector(config.PARSER_SELECTOR_PAGINATION);
    if (!maxSize) {
      maxSize = document.querySelector(config.PARSER_SELECTOR_PAGINATION_LAST_CHILD);
    }
    return (maxSize && maxSize.href) || null;
  }

  function createPagesLinks(maxPageString) {
    const pages = [];
    const myURL = new URL(maxPageString);
    const maxPage = +myURL.searchParams.get('page');

    for (let i = 0; i <= maxPage; i++) {
      myURL.searchParams.set('page', i);
      pages.push(myURL.href);
    }

    return pages;
  }

  prepare.setTotal(listOfProfessions.length);


  for (const profession of listOfProfessions) {
    for (const specialization of profession.specialization) {
      const pageURL = new URL(specialization.link);
      pageURL.searchParams.set('items_on_page', 100);
      const link = pageURL.href;
      await page.goto(link, { waitUntil: 'domcontentloaded' });
      const maxPageString = await page.evaluate(getSize, env);
      if (maxPageString) {
        specialization.pages.push(...createPagesLinks(maxPageString));
      } else {
        specialization.pages.push(specialization.link);
      }
    }
    prepare.increment();
  }
}


async function scrapeSpecialization(listOfProfessions) {

  function getSpecialization(config) {
    function checkElement() {
      return document.body.contains(config.PARSER_SELECTOR_SPECIALIZATION)
    }
    if (!checkElement()) {
      return null
    }
    const specialization = Array.from(document.querySelectorAll(config.PARSER_SELECTOR_SPECIALIZATION));
    return specialization.map((item) => {
      const title = (item.querySelector(config.PARSER_SELECTOR_SPECIALIZATION_NAME)
        && item.querySelector(config.PARSER_SELECTOR_SPECIALIZATION_NAME).textContent) || null;
      const amountVacancies = (item.querySelector(config.PARSER_SELECTOR_SPECIALIZATION_AMOUNT)
        && +item.querySelector(config.PARSER_SELECTOR_SPECIALIZATION_AMOUNT).textContent) || null;
      const link = (item.querySelector(config.PARSER_SELECTOR_SPECIALIZATION_LINK)
        && item.querySelector(config.PARSER_SELECTOR_SPECIALIZATION_LINK).href) || null;

      return {
        title,
        amountVacancies,
        link,
        pages: [],
        jobs: [],
      };
    });
  }

  for (const item of listOfProfessions) {
    await page.goto(item.link, { waitUntil: 'domcontentloaded' });
    const data = await page.evaluate(getSpecialization, env);
    if (data === null) {
      /*eslint no-unreachable:0*/
      throw new Error(`warning element not found selector: ${env.PARSER_SELECTOR_SPECIALIZATION}`);
    }

    const filterData = data.filter((item) => {
        return item.link && item.title;
    });

    item.specialization.push(...filterData);
  }

}


async function scrapeProfessions() {
  await page.goto(env.PARSER_INIT_URL, { waitUntil: 'domcontentloaded' });

/*eslint max-len:0*/
  function getProfessions(env) {
    const jobs = Array.from(document.querySelectorAll(env.PARSER_SELECTOR_PROFESSIONS_ITEMS));

    return jobs.map((item) => {
      const title = (item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_NAME)
                && item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_NAME).textContent) || null;
      const amountVacancies = (item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_AMOUNT)
                && +item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_AMOUNT).textContent) || null;
      const link = (item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_LINK)
                && item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_LINK).href) || null;

      return {
        title,
        amountVacancies,
        link,
        specialization: [],
      };
    });
  }

  let listOfProfessions = await page.evaluate(getProfessions, env);
  listOfProfessions = listOfProfessions.filter((item) => !!item.title && !!item.amountVacancies && !!item.link);

  return listOfProfessions;
}

async function saveResult(listOfProfessions) {
  const jobsAmount = listOfProfessions.reduce((accum, item) => {
    const specialization = item.specialization;
    for (const specializationItem of specialization) {
      accum += specializationItem.jobs.length;
    }
    return accum;
  }, 0);

  savedBar.setTotal(jobsAmount);

  for (const profession of listOfProfessions) {
    const category = await Category.create(profession);
    for (const specialization of profession.specialization) {
      const specializationItem = Object.assign(specialization, { category: category._id });
      const specializationModel = await Specialization.create(specializationItem);

      for (const job of specialization.jobs) {
        savedBar.increment();
        const item = Object.assign(job, { category: category._id, specialization: specializationModel._id });
        await Vacancy.create(item);
      }
    }
  }
}

async function main() {
  browser = await puppeteer.launch({
    headless: !env.PARSER_HEADLESS,
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
    await scrapeSpecialization(profs);
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

main().then(() => {
  process.exit(0);
}).catch(() => {
  process.exit(1);
});
