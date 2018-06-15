import axios from 'axios';
import moment from 'moment';
const token = 'token=4F7NRFGPSPSBYJKVZTDR';
const baseURL = 'https://www.eventbriteapi.com/v3';

const requestData = url => {
  return axios.get(url);
};

const convertUTC = date => {
  return date ? moment.utc(date).format() : '';
};

export const getCategories = async () => {
  const url = `${baseURL}/categories/?${token}`;
  const response = await requestData(url);
  return response.data.categories;
};

export const getSubCategories = async (page = 1, data = []) => {
  const url = `${baseURL}/subcategories/?${token}&page=${page}`;
  const response = await requestData(url);
  const { subcategories, pagination } = response.data;
  if (pagination.has_more_items) {
    return getSubCategories(page + 1, [...subcategories, ...data]);
  } else {
    let finalSubcategories = {};
    [...subcategories, ...data].forEach(subCategory => {
      finalSubcategories[subCategory.id] = subCategory.name;
    });
    return finalSubcategories;
  }
};

export const getVenue = id => {
  const url = `${baseURL}/venues/${id}/?${token}`;
  return requestData(url);
};

export const searchEventsWith = async ({ checkedCategories, price, date }) => {
  let categoryID = checkedCategories.join(',');
  const url = `${baseURL}/events/search/?${token}&categories=${categoryID}&price=${price}&location.address=taiwan&start_date.range_start=${convertUTC(
    date.start,
  )}&start_date.range_end=${convertUTC(date.end)}`;

  const response = await requestData(url);
  return response.data;
};
