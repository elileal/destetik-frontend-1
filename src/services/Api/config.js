import axios from 'axios';

const api = axios.create({
  baseURL: 'https://destetik-backend.herokuapp.com/'
});

export default api;
