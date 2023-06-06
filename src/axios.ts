import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'x-auth': localStorage.getItem('token')
  },
  baseURL: process.env.REACT_APP_URI,
});

export default instance;