import { parsePrices } from './price';
import {average, getRange, round, getModa} from './math'
import IVacancies from 'db/interfaces/vacancies'
/* eslint no-restricted-syntax:0 */

interface IAdaptProfession {
  averagePrice: number,
  title: string,
  moda: number,
  scope: number,
}


function adaptPrice(vacancies: Array<IVacancies> = []) : Array<number> {
  const res: Array<number> = [];
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
  const res: Array<IAdaptProfession> = [];
  for (const prof of data) {
    const { vacancies, title} = prof;
    const averagePriceArray = adaptPrice(vacancies);
    const averagePrice = average(averagePriceArray);
    const modaPriceArray = averagePriceArray.map((item) => round(item));
    const moda: number = getModa(modaPriceArray);
    const scope: number = getRange(averagePriceArray);
    res.push({
      averagePrice,
      title: title,
      moda,
      scope,
    });
  }
  return res;
}

export default adaptProf;
