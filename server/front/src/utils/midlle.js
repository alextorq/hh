import parsePrices from './price';
/* eslint no-restricted-syntax:0 */

function average(nums) {
  return Math.floor(nums.reduce((a, b) => (a + b)) / nums.length);
}

function adaptVacancies(vacancies) {
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

function adaptProf(data) {
  const res = {};
  for (const prof of data) {
    const { vacancies } = prof;
    res[prof.title] = average(adaptVacancies(vacancies));
  }
  return res;
}

export default adaptProf;
