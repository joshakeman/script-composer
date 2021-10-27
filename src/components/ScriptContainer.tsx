import React, {useState, useCallback, useEffect} from 'react'
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
    useEffect(()=> {
        if (days.length === 1 && days[0].lines.length === 1) {
            handleTabChange({} as React.SyntheticEvent, 1)
        }
    },[])

    const [days, setDays] = useState<ScriptState["days"]>([{
        ix: 0,
        lines: [
            {
                id: 1,
                text: "",
                character: "",
                selectedVariable: "",
                variables: []
            }
        ]
    }])
    const [selectedDay, setSelectedDay] = useState<ScriptState["selectedDay"]>({} as Day)

    const addDay = () => {
        setDays(prevState => [...prevState,{
            ix: prevState.length,
            lines: [{id: 1, text: "", character: "", selectedVariable: "", variables: []}]
        }])
    }

    const [value, setValue] = React.useState(1);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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

    const handleCharacterChange = (dayIndex: number, index: number) => (e: any) => {
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines[index].character = e.target.value; // replace e.target.value with whatever you want to change it to
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    const addLine = (dayIndex: number) => {
        console.log("day index is: ", dayIndex)
        let newArr = [...days]; // copying the old datas array
        console.log(newArr)
        let updatedDay = {...newArr[dayIndex]}
        console.log(updatedDay)
        updatedDay.lines.push({id: updatedDay.lines.length+1, text: "", character: "", selectedVariable: "", variables: []})
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    const rearrangeLines = (dayIndex: number, newLines: Line[]) => {
        console.log("running rearrange lines on day: ", dayIndex)
        setSelectedDay({
            ...selectedDay,
            lines: newLines
        })

        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        console.log(updatedDay)
        updatedDay.lines = newLines
        console.log(updatedDay)
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    return (
            <div style={{overflowX: 'scroll'}}>
                <Button variant="contained" onClick={addDay}>Add Day</Button>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
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
                    <DayContainer 
                    day={selectedDay} 
                    addLine={addLine} 
                    setLines={rearrangeLines} 
                    handleChangeText={handleChangeText} 
                    handleCharacterChange={handleCharacterChange} 
                    />
                ) : (
                    null
                )}
            </div>
    )
}
