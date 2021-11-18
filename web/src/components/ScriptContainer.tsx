import React, {useState, useCallback, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import TextBox from './TextBox'
import Button from '@mui/material/Button';
// import { Line } from './Constants'
import update from 'immutability-helper'
import { DayContainer } from './DayContainer'
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

import { addNewDay, selectDayList } from '../redux/reducers/script'

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
    time: Date | null
    switchStatus: boolean
    yesAnswer: string
    noAnswer: string
    timeoutAnswer: string
  }
export interface Day {
    ix: number
    lines: Array<Line>
}

export default function ScriptContainer() {
    const dayList = useSelector(selectDayList);
    const dispatch = useDispatch();

    useEffect(()=> {
        if (dayList.length === 1 && dayList[0].lines.length === 1) {
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
                variables: [],
                time: null,
                switchStatus: false,
                yesAnswer: "",
                noAnswer: "",
                timeoutAnswer: ""
            }
        ]
    }])
    const [selectedDay, setSelectedDay] = useState<ScriptState["selectedDay"]>({} as Day)

    const dispatchAddDay = () => {
        dispatch(addNewDay())
    }

    const [value, setValue] = React.useState(1);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      setSelectedDay(days[newValue-1])
    };

    const handleChangeText = (dayIndex: number, index: number) => (e: any) => {
        console.log(`Calling handle change text on day ${dayIndex}, line ${index}`)
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines[index].text = e.target.value; // replace e.target.value with whatever you want to change it to
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    const handleChangeYesAnswer = (dayIndex: number, index: number) => (e: any) => {
        console.log(`Calling handle change text on day ${dayIndex}, line ${index}`)
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines[index].yesAnswer = e.target.value; // replace e.target.value with whatever you want to change it to
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    const handleChangeNoAnswer = (dayIndex: number, index: number) => (e: any) => {
        console.log(`Calling handle change text on day ${dayIndex}, line ${index}`)
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines[index].noAnswer = e.target.value; // replace e.target.value with whatever you want to change it to
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    const handleChangeTimeoutAnswer = (dayIndex: number, index: number) => (e: any) => {
        console.log(`Calling handle change text on day ${dayIndex}, line ${index}`)
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines[index].timeoutAnswer = e.target.value; // replace e.target.value with whatever you want to change it to
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

    const handleVariableChange = (dayIndex: number, index: number) => (e: any) => {
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines[index].selectedVariable = e.target.value // replace e.target.value with whatever you want to change it to
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }
  
    const insertVariable = (dayIndex: number, index: number) => {
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}

        let newLineArr = [...updatedDay.lines]; // copying the old datas array
        newLineArr[index].variables = [...newLineArr[index].variables, newLineArr[index].selectedVariable]; // replace e.target.value with whatever you want to change it to
        newLineArr[index].text += `{{ ${newLineArr[index].selectedVariable} }}`
        newLineArr[index].selectedVariable = ""

        updatedDay.lines = newLineArr
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    const addLine = (dayIndex: number) => {
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines.push({
            id: updatedDay.lines.length+1, 
            text: "", 
            character: "", 
            selectedVariable: "", 
            variables: [], 
            time: null, 
            switchStatus: false,
            yesAnswer: "",
            noAnswer: "",
            timeoutAnswer: ""
        })
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
        updatedDay.lines = newLines
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    const handleChangeTime = (dayIndex: number, index: number, time: Date | null) => {
        console.log("Calling handle change time")
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines[index].time = time; // replace e.target.value with whatever you want to change it to
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    const toggleSwitch = (dayIndex: number, index: number) => (e: any) => {
        let newArr = [...days]; // copying the old datas array
        let updatedDay = {...newArr[dayIndex]}
        updatedDay.lines[index].switchStatus = !updatedDay.lines[index].switchStatus; // replace e.target.value with whatever you want to change it to
        newArr[dayIndex] = updatedDay
        setDays(newArr);
    }

    return (
        <>
            <div style={{display:'flex', flexDirection:'column'}}>
                <Stack sx={{width: '100%' }}>
                    <Divider />
                        <Toolbar sx={{width: '90%', display: 'flex', justifyContent: 'space-between' }} >
                            <h1>Script Builder</h1>
                            <Button variant="contained" color="secondary" >Save</Button>
                        </Toolbar>
                    <Divider />
                </Stack>
            </div>
            <div style={{overflowX: 'scroll', margin: '10px 0'}}>
                <Button variant="contained" onClick={dispatchAddDay}>Add Day</Button>
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
                        dayList.map((day: any, index: any) => <Tab value={index+1} label={index+1} />)
                    }
                </Tabs>
                {selectedDay.ix !== undefined ? (
                    <DayContainer 
                    day={selectedDay} 
                    addLine={addLine} 
                    setLines={rearrangeLines} 
                    handleChangeText={handleChangeText} 
                    handleCharacterChange={handleCharacterChange}
                    handleVariableChange={handleVariableChange}
                    insertVariable={insertVariable}
                    handleChangeTime={handleChangeTime}  
                    toggleSwitch={toggleSwitch}
                    handleChangeYesAnswer={handleChangeYesAnswer} 
                    handleChangeNoAnswer={handleChangeNoAnswer}
                    handleChangeTimeoutAnswer={handleChangeTimeoutAnswer}
                    />
                ) : (
                    null
                )}
            </div>
        </>
    )
}
