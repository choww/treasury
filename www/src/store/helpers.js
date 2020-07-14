import axiosModule from 'axios';

const axios = jwt => {
  return axiosModule.create({
  baseUrl: process.env.API_URL,
  headers: { 
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  }
});

module.exports = axios;
