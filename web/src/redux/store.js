import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './reducers/characters';

export default configureStore({
  reducer: {
    characters: charactersReducer,
  },
});