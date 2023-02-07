import axios from 'axios';

const jwt = localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Authorization: `Bearer ${jwt}`
  }
});

export default instance;
