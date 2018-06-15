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

export const getVenue = async id => {
  const url = `${baseURL}/venues/${id}/?${token}`;
  const response = await requestData(url);
  return response.data;
};

export const searchEventsWith = async ({
  checkedCategories,
  price,
  startDate,
  endDate,
  query,
  country,
}) => {
  let categoryID = checkedCategories.join(',');
  const url = `${baseURL}/events/search/?${token}&q=${query}&categories=${categoryID}&price=${price}&location.address=${country}&start_date.range_start=${convertUTC(
    startDate,
  )}&start_date.range_end=${convertUTC(endDate)}`;
  const response = await requestData(url);
  return response.data;
};
