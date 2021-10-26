import React, {useState, useCallback} from 'react'
import TextBox from './TextBox'
import Button from '@mui/material/Button';
// import { Line } from './Constants'
import update from 'immutability-helper'
import { DayContainer } from './DayContainer'
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface ScriptState {
    days: Array<Day>
    selectedDay: Day
}

export interface Line {
    id: number
    text: string
    character: string
    selectedVariable: string
    variables: Array<string>
  }
export interface Day {
    ix: number
    lines: Array<Line>
}

export default function ScriptContainer() {
    const [days, setDays] = useState<ScriptState["days"]>([])
    const [selectedDay, setSelectedDay] = useState<ScriptState["selectedDay"]>({} as Day)

    const addDay = () => {
        setDays(prevState => [...prevState,{
            ix: prevState.length,
            lines: [{id: 1, text: "", character: "", selectedVariable: "", variables: []}]
        }])
    }

    const [value, setValue] = React.useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      setSelectedDay(days[newValue-1])
    };

    // const setLines= () => {
    //     let newArr = [...days]; // copying the old datas array
    //     newArr[index].text = e.target.value; // replace e.target.value with whatever you want to change it to
    //     setLines(newArr);
    // }

    const handleChangeText = (dayIndex: number, index: number) => (e: any) => {
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines[index].text = e.target.value; // replace e.target.value with whatever you want to change it to
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    const setLines = (dayIndex: number) => {
        console.log("day index is: ", dayIndex)
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines.push({id: updatedDay.lines.length+1, text: "", character: "", selectedVariable: "", variables: []})
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    return (
            <div style={{overflowX: 'scroll'}}>
                <Button variant="contained" onClick={addDay}>Add Day</Button>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    sx={{
                        overflowX: 'scroll'
                    }}
                >
                    {
                        days.map((day, index) => <Tab value={index+1} label={index+1} />)
                    }
                </Tabs>
                {/* {days.map((day, index) => <DayContainer index={index}/>)} */}
                {selectedDay.ix !== undefined ? (
                    <DayContainer day={selectedDay} setLines={setLines} handleChangeText={handleChangeText} />
                ) : (
                    null
                )}
            </div>
    )
}
