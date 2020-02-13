import axios from 'axios';

const host = 'http://127.0.0.1:4001/';

export function getCategories() {
  return axios.get(`${host}category/list`).then((response) => response.data);
}

export function getVacancies() {
  return axios.get(`${host}vacancy/list`).then((response) => response.data);
}

export function getCategoriesWithVacancies() {
  return axios.get(`${host}category/list_with_vacancies`).then((response) => response.data);
}
