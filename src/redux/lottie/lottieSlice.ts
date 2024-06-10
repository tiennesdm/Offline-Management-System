import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface representing a Lottie object.
 * @interface
 */
export interface Lottie {
  id: string;
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
  name: string;
  description: string;
  isValidLottie: boolean;
}

/**
 * Interface representing the state of Lotties.
 * @interface
 */
interface LottieState {
  lotties: Lottie[];
  error?: any;
}

/**
 * Interface representing the error state.
 * @interface
 */
interface ErrorState {
  error?: any;
}

/**
 * Initial state for the Lottie slice.
 * @type {LottieState}
 */
const initialState: LottieState = {
  lotties: [],
  error: ''
};

/**
 * Slice for managing Lottie state.
 */
const lottieSlice = createSlice({
  name: 'lottie',
  initialState,
  reducers: {
    /**
     * Set the list of Lotties in the state.
     * @param {LottieState} state - The current state.
     * @param {PayloadAction<Lottie[]>} action - The action containing the Lotties.
     */
    setLotties(state, action: PayloadAction<Lottie[]>) {
      state.lotties = action.payload;
    },

    /**
     * Set an error in the state.
     * @param {LottieState} state - The current state.
     * @param {PayloadAction<ErrorState>} action - The action containing the error.
     */
    setError(state, action: PayloadAction<ErrorState>) {
      state.error = action.payload;
    },

    /**
     * Add a new Lottie to the state.
     * @param {LottieState} state - The current state.
     * @param {PayloadAction<Lottie>} action - The action containing the new Lottie.
     */
    addLottie(state, action: PayloadAction<Lottie>) {
      state.lotties.push(action.payload);
    },
  },
});

/**
 * Actions generated from the slice.
 */
export const { setLotties, addLottie, setError } = lottieSlice.actions;

/**
 * Reducer for the Lottie slice.
 */
export default lottieSlice.reducer;
