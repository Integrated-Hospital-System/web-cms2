import axios from 'axios';

// baseURL : 'https://mamed.herokuapp.com'
// baseURL: 'http://localhost:3000'

const instance = axios.create({
  baseURL : 'https://mamed.herokuapp.com'
});

export default instance;