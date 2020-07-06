const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function scrape(port) {
  const browser = await puppeteer.launch({
    args: [`--proxy-server=socks5://127.0.0.1:${port}`],
  });

  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com/');
  const content = await page.content();

  const $ = cheerio.load(content);

  const titles = [];

  $('.storylink').slice(0, 5).each((idx, elem) => {
    const title = $(elem).text();
    titles.push(title);
  });

  browser.close();
  return titles;
}

async function main() {
  /**
     * Tor SOCKS ports that we defined in torrc file.
     */
  const ports = [
    '9050',
    '9052',
    '9053',
    '9054',
  ];

  /**
     * Scrape forever...
     */
  while (true) {
    for (const port of ports) {
      /**
             * ...each time with different port.
             */
      console.log(await scrape(port));
    }
  }
}

main();
