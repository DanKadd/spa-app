import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'x-auth': token
  },
  baseURL: process.env.REACT_APP_URI,
});

export default instance;