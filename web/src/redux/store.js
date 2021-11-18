import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './reducers/characters';
import variablesReducer from './reducers/variables';

export default configureStore({
  reducer: {
    characters: charactersReducer,
    variables: variablesReducer,
  },
});