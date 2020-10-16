import axios from 'axios';

export default axios.create({
  baseURL: `https://cartographievbg.herokuapp.com/api/`
});