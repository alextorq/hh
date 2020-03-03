import { parsePrices } from './price';
import {average, getRange, round, getModa} from './math'
/* eslint no-restricted-syntax:0 */


function adaptPrice(vacancies: Array<object> = []) : Array<any> {
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
