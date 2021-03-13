import axios from 'axios';

// const host = process.env.prodaction ? '/' : 'http://127.0.0.1:4001/';
const host = '/api/';

export function getCategories() {
  return axios.get(`${host}category/list`).then((response) => Object.freeze(response.data));
}

export function getVacancies() {
  return axios.get(`${host}vacancy/list`).then((response) => Object.freeze(response.data));
}

export function getCategoriesWithVacancies() {
  return axios.get(`${host}category/list_with_vacancies`).then((response) => Object.freeze(response.data));
}

export function getCategoriesWithSpecialization() {
  return axios.get(`${host}category/list_with_specialization`).then((response) => Object.freeze(response.data));
}
