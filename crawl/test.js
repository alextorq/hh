const puppeteer = require('puppeteer');
const { URL } = require('url');
const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');
const { getVacancies, getSize, getSpecialization, getProfessions } = require('./utils')


let env = dotenv.config({});
env = dotenvParseVariables(env.parsed);

let browser;
let page;
const ignoredTypes = ['stylesheet', 'font', 'image', 'media', 'texttrack', 'manifest', 'websocket'];
const blackListDomains = ['https://mc.yandex.ru/metrika/watch.js',
  'https://statad.ru/pixel.gif', 'https://spb.hh.ru/analytics', 'https://spb.hh.ru/stat?url='];

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
  for (const profession of listOfProfessions) {
    for (const specialization of profession.specialization) {
      for (const specializationPage of specialization.pages) {
        try {
          await page.goto(specializationPage, { waitUntil: 'domcontentloaded' });
          const jobs = await page.evaluate(getVacancies, env);
          specialization.jobs.push(...jobs);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}


async function getPagination(listOfProfessions) {
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
  }
}


async function scrapeSpecialization(listOfProfessions) {
  for (const item of listOfProfessions) {
    await page.goto(item.link, { waitUntil: 'domcontentloaded' });
    const data = await page.evaluate(getSpecialization, env);

    const filterData = data.filter((itemw) => {
      return itemw.link && itemw.title;
    });

    item.specialization.push(...filterData);
  }
}


async function scrapeProfessions() {
  await page.goto(env.PARSER_INIT_URL, { waitUntil: 'domcontentloaded' });
  const listOfProfessions = await page.evaluate(getProfessions, env);
  return listOfProfessions.filter((item) => !!item.title && !!item.amountVacancies && !!item.link);
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
      req.continue();
    }
  });

  try {
    const profs = await scrapeProfessions();
    if (!profs.length) {
      throw Error('Not found list of prof');
    }
    if (profs[0].title !== 'Продажи') {
      throw new Error(`element probably not fount selector: ${env.PARSER_SELECTOR_PROFESSIONS_ITEMS}`)
    }

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
