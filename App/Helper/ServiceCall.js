import axios from 'axios';

let http = axios.create({
  //https://fakestoreapi.com/products
  baseURL: 'https://fakestoreapi.com/',
  timeout: 10000,
  headers: {
    'Content-Type': ':application/json',
  },
});

const baseURL = 'https://fakestoreapi.com/';

const axoisPramsGet = async (url, data) => {
  let res = '';
  // let fullUrl = baseURL + url;
  return axios
    .get(url, data)
    .then(function (response) {
      response =
        typeof response.data === 'string'
          ? JSON.parse(response.data.trim())
          : response.data;
      return response;
    })
    .catch(error => {
      return error;
    });
};

const axoisGet = async url => {
  let fullUrl = baseURL + url;
  return axios
    .get(fullUrl)
    .then(function (response) {
      response =
        typeof response.data === 'string'
          ? JSON.parse(response.data.trim())
          : response.data;
      return response;
    })
    .catch(error => {
      return error;
    });
};

export {axoisPramsGet, axoisGet};
