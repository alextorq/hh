function getVacancies(config) {
  const jobs = Array.from(document.querySelectorAll(config.PARSER_SELECTOR_VACANCIES_ITEMS));
  return jobs.map((item) => {
    const title = item.querySelector(config.PARSER_SELECTOR_VACANCIES_NAME)?.textContent ?? null
    const price = item.querySelector(config.PARSER_SELECTOR_VACANCIES_PRICE)?.textContent ?? null;
    const company = item.querySelector(config.PARSER_SELECTOR_VACANCIES_COMPANY)?.textContent ?? null;
    const link = item.querySelector(config.PARSER_SELECTOR_VACANCIES_LINK)?.href ?? null;

    return {
      title,
      price,
      company,
      link,
    };
  });
}

function getSize(config) {
  let maxSize = document.querySelector(config.PARSER_SELECTOR_PAGINATION);
  if (!maxSize) {
    maxSize = document.querySelector(config.PARSER_SELECTOR_PAGINATION_LAST_CHILD);
  }
  return (maxSize && maxSize.href) || null;
}


function getSpecialization(config) {
  const specialization = Array.from(document.querySelectorAll(config.PARSER_SELECTOR_SPECIALIZATION));
  return specialization.map((item) => {
    const title = item.querySelector(config.PARSER_SELECTOR_SPECIALIZATION_NAME)?.textContent ?? null;
    const amountVacancies = item.querySelector(config.PARSER_SELECTOR_SPECIALIZATION_AMOUNT)?.textContent ?? null;
    const link = item.querySelector(config.PARSER_SELECTOR_SPECIALIZATION_LINK)?.href ?? null;

    return {
      title,
      amountVacancies,
      link,
      pages: [],
      jobs: [],
    };
  });
}

/*eslint max-len:0*/
function getProfessions(env) {
  const jobs = Array.from(document.querySelectorAll(env.PARSER_SELECTOR_PROFESSIONS_ITEMS));

  return jobs.map((item) => {
    const title = item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_NAME)?.textContent ?? null;
    const amountVacancies = item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_AMOUNT)?.textContent ?? null;
    const link = item.querySelector(env.PARSER_SELECTOR_PROFESSIONS_LINK)?.href ?? null;

    return {
      title,
      amountVacancies,
      link,
      specialization: [],
    };
  });
}


module.exports = {getVacancies, getSize, getSpecialization, getProfessions}
