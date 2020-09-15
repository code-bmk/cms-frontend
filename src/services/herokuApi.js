import axios from 'axios';
import {
  BASE_URL_PATH,
} from '../constants/constant';


export const getPostDetailsById = async postId => {
  try {
    const response = await axios.get(`${BASE_URL_PATH}post/getOne/${postId}`);
    return response.data;
  } catch (err) {
    console.error(
      `There was a problem finding the details of this movie: ${err}`,
    );
    throw err;
  }
};