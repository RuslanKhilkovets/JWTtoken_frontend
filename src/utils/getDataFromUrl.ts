import axios from 'axios';

export default async function getDataFromUrl(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}
