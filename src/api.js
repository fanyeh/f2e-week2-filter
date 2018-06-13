import axios from 'axios';
const token = 'token=4F7NRFGPSPSBYJKVZTDR';
const baseURL = 'https://www.eventbriteapi.com/v3';

const requestData = url => {
  return axios.get(url);
};

export const getCategories = () => {
  const url = `${baseURL}/categories/?${token}`;
  return requestData(url);
};
export const getSubCategories = () => {
  const url = `${baseURL}/subcategories/?${token}`;
  return requestData(url);
};

export const getVenue = id => {
  const url = `${baseURL}/venues/${id}/?${token}`;
  return requestData(url);
};

export const searchEventsWith = ({ categories, price, date }) => {
  let categoryID = categories.join(',');
  const url = `${baseURL}/events/search/?${token}&categories=${categoryID}&price=${price}&location.address=taiwan&start_date.range_start=${
    date.start
  }&start_date.range_end=${date.end}`;
  return requestData(url);
};
