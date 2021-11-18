import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'characters',
  initialState: {
    list: [],
  },
  reducers: {
    addNew: (state, action) => {
          state.list.push({id: state.list.length, name:action.payload, mug:''})
        },
    updateChar: (state, action) => {
        let newState = state
        let thisOne = state.list.find(c => c?.id === action.payload.id);
        thisOne?.name !== undefined ? thisOne.name = action.payload.name : console.log();
        let restOf = state.list.filter(c => c?.id !== action.payload.id);
        let newArray = [...restOf, thisOne].sort( compare );
        newState.characters = newArray
        state = newState
    },
    incrementByAmount: (state, action) => {
        state.value += action.payload;
      },
    // addNew: {
    //     reducer: (state, action>) => {
    //         state.push({id: state.list.length, name:action.payload, mug:''}),
    //     }
    // },
  },
});

export const { addNew, updateChar, incrementByAmount } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCharList = state => state.characters.list;

export default slice.reducer;

function compare( a, b ) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }
