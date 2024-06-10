import { AppDispatch } from '../store';
import { setLotties, addLottie, setError } from './lottieSlice';
import { fetchLotties, searchLotties, uploadLottie } from '../../services/lottieService';

/**
 * Asynchronous action to load all Lotties.
 * 
 * Dispatches either the setLotties action with the fetched Lotties
 * or the setError action with an error message if fetching fails.
 *
 * @function
 * @returns {Function} A thunk function that handles the async logic.
 */
export const loadLotties = () => async (dispatch: AppDispatch) => {
  try {
    const lotties = await fetchLotties();
    dispatch(setLotties(lotties));
  } catch (error) {
    dispatch(setError({ error: 'Something Went Wrong to load Lotties:' }));
  }
};

/**
 * Asynchronous action to search for Lotties based on a query.
 * 
 * Dispatches either the setLotties action with the searched Lotties
 * or the setError action with an error message if the search fails.
 *
 * @function
 * @param {string} query - The search query string.
 * @returns {Function} A thunk function that handles the async logic.
 */
export const searchForLotties = (query: string) => async (dispatch: AppDispatch) => {
  try {
    const lotties = await searchLotties(query);
    dispatch(setLotties(lotties));
  } catch (error) {
    dispatch(setError({ error: 'Something Went Wrong Search Query' }));
  }
};

/**
 * Asynchronous action to upload a new Lottie file.
 * 
 * Dispatches either the addLottie action with the uploaded Lottie
 * or logs an error message if the upload fails.
 *
 * @function
 * @param {File} file - The Lottie file to upload.
 * @param {string} name - The name of the Lottie.
 * @param {string} description - The description of the Lottie.
 * @returns {Function} A thunk function that handles the async logic.
 */
export const uploadNewLottie = (file: File, name: string, description: string) => async (dispatch: AppDispatch) => {
  try {
    const lottie = await uploadLottie(file, name, description);
    dispatch(addLottie(lottie));
  } catch (error) {
    console.error('Failed to upload Lottie:', error);
  }
};
