import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './reducers/characters';
import variablesReducer from './reducers/variables';
import scriptReducer from './reducers/script'

export default configureStore({
  reducer: {
    characters: charactersReducer,
    variables: variablesReducer,
    script: scriptReducer,
  },
});