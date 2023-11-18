import databaseAxiosInterceptors from '../API/jsonDatabaseInterceptors';


export default async function getDataFromUrl(url: string) {

  const timeout = 20000;

  try {
    const response = await databaseAxiosInterceptors.get(url, {timeout});
    return response.data;
  } catch (error) {
    throw error; 
  }
}