import { parsePrices } from './price';
/* eslint no-restricted-syntax:0 */

function average(nums = []) {
  return Math.floor(nums.reduce((a, b) => (a + b)) / nums.length);
}

function adaptPrice(vacancies = []) {
  const res = [];
  for (const vacancy of vacancies) {
    if (vacancy.price) {
      const allPrice = parsePrices(vacancy.price);
      const price = average(allPrice);
      res.push(price);
    }
  }
  return res;
}

function getModa(data = []) {
  const res = {};
  for (const item of data) {
    if (!res[item]) { res[item] = 0; }
    res[item] = res[item] + 1;
  }

  let max = 0;
  let key = 0;

  for (const item in res) {
    if (res[item] > max) { max = res[item]; key = item; }
  }
  return key;
}


function round(val, rad = 5000) {
  return Math.round(val / rad) * rad;
}


function getRange(prices) {
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  return max - min;
}

function adaptProf(data = []) {
  const res = [];
  for (const prof of data) {
    const { vacancies } = prof;
    const averagePriceArray = adaptPrice(vacancies);
    const averagePrice = average(averagePriceArray);
    const modaPriceArray = averagePriceArray.map((item) => round(item));
    const moda = getModa(modaPriceArray);
    const scope = getRange(averagePriceArray);
    res.push({
      averagePrice,
      title: prof.title,
      moda,
      scope,
    });
  }
  return res;
}

export default adaptProf;
