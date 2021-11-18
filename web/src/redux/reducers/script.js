import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'script',
  initialState: {
    days: [{
        ix: 0,
        lines: [{
            id: 1, 
            text: "", 
            character: "", 
            selectedVariable: "", 
            variables: [], 
            time: null, 
            switchStatus: false,
            yesAnswer: "",
            noAnswer: "",
            timeoutAnswer: ""
        }]
    }],
  },
  reducers: {
    addNewDay: state => {
            state.days.push({
                ix: state.days.length,
                lines: [{
                    id: 1, 
                    text: "", 
                    character: "", 
                    selectedVariable: "", 
                    variables: [], 
                    time: null, 
                    switchStatus: false,
                    yesAnswer: "",
                    noAnswer: "",
                    timeoutAnswer: ""
                }]
            })
        },
    handleChangeLineText: (state, action) => {
        state.days[action.payload.dayIx].lines[action.payload.lineIx].text = action.payload.textVal

        // let thisDay = state.days.find(c => c?.ix === action.payload.dayIx);
        // let restOfDays = state.days.filter(c => c?.ix !== action.payload.dayIx);

        // console.log(thisDay)
        // let thisLine = thisDay.lines.find(l => l.id === action.payload.lineId)
        // let otherLines = thisDay.lines.filter(l => l.id !== action.payload.lineId) 

        // thisDay.lines = [...otherLines, thisLine]

        // let newArray = [...restOfDays, thisDay].sort( compareDays );
        // state.days = newArray
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

export const { addNewDay, handleChangeLineText } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDayList = state => state.script.days;

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

function compareDays( a, b ) {
    if ( a.ix < b.ix ){
      return -1;
    }
    if ( a.ix > b.ix ){
      return 1;
    }
    return 0;
  }
