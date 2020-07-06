const { URL } = require('url');

const URLString = 'https://spb.hh.ru/search/vacancy?L_is_autosearch=false&area=2&clusters=true&enable_snippets=true&specialization=1&page=99';

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

const a = createPagesLinks(URLString);
console.log(a);
