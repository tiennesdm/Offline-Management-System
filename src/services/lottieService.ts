import client from '../graphql/apolloClient';
import { GET_LOTTIES, SEARCH_LOTTIES } from '../graphql/queries';
import { UPLOAD_LOTTIE } from '../graphql/mutations';

/**
 * Fetches all Lotties from the server.
 * 
 * @async
 * @function
 * @returns {Promise<Lottie[]>} A promise that resolves to an array of Lotties.
 * @throws Will throw an error if the query fails.
 */
export const fetchLotties = async () => {
  const { data } = await client.query({ query: GET_LOTTIES });
  return data.lotties;
};

/**
 * Searches for Lotties based on a query string.
 * 
 * @async
 * @function
 * @param {string} query - The search query string.
 * @returns {Promise<Lottie[]>} A promise that resolves to an array of Lotties matching the search query.
 * @throws Will throw an error if the query fails.
 */
export const searchLotties = async (query: string) => {
  const { data } = await client.query({
    query: SEARCH_LOTTIES,
    variables: { query },
  });
  return data.searchLotties;
};

/**
 * Uploads a new Lottie file to the server.
 * 
 * @async
 * @function
 * @param {File} file - The Lottie file to upload.
 * @param {string} name - The name of the Lottie.
 * @param {string} description - The description of the Lottie.
 * @returns {Promise<Lottie>} A promise that resolves to the uploaded Lottie.
 * @throws Will throw an error if the upload fails.
 */
export const uploadLottie = async (file, name, description) => {
  const formData = new FormData();

  // Define the operations with the query and variables
  const operations = {
    query: UPLOAD_LOTTIE,
    variables: {
      file: null,  // This will be replaced by the actual file data
      name,
      description,
    },
  };

  // Append the operations and map to FormData
  formData.append('operations', JSON.stringify(operations));
  formData.append('map', JSON.stringify({ '0': ['variables.file'] }));

  // Append the actual file to FormData
  formData.append('0', file);

  try {
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      body: formData,
      headers: {
        // Content-Type will be automatically set by FormData
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data.uploadLottie;
  } catch (error) {
    throw error;
  }
};
