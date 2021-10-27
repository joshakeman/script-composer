import { FC, useState, useCallback, useEffect } from 'react'
import { Card } from './Card'
import Button from '@mui/material/Button';
import update from 'immutability-helper'
import Paper from '@mui/material/Paper';


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

export interface ContainerState {
  lines: Line[]
}

export interface Day {
  ix: number
  lines: Array<Line>
}

export interface ContainerProps {
  // index: number
  day: Day
  setLines: any
  addLine: any
  handleChangeText: any
  handleCharacterChange: any
  handleVariableChange: any
  insertVariable: any
  handleChangeTime: any 
  toggleSwitch: any

  handleChangeYesAnswer: any
  handleChangeNoAnswer: any
  handleChangeTimeoutAnswer: any
}

export const DayContainer: FC<ContainerProps> = ({ day, setLines, addLine, handleChangeText, handleCharacterChange, handleVariableChange, insertVariable, handleChangeTime, toggleSwitch, handleChangeYesAnswer, handleChangeNoAnswer, handleChangeTimeoutAnswer }) => {
  {
    // const [lines, setLines] = useState([
    //   {
    //     id:1, 
    //     text:"", 
    //     character:"", 
    //     selectedVariable:"",
    //     variables: [""]
    //   }
    // ])
    useEffect(()=>{

    },[])

    let lines = day.lines

    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = lines[dragIndex]
        setLines(day.ix,
          update(lines, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
      },
      [lines],
    )

    // const handleChange = (index: number) => (e: any) => {
    //     let newArr = [...lines]; // copying the old datas array
    //     newArr[index].text = e.target.value; // replace e.target.value with whatever you want to change it to
    //     setLines(newArr);
    // }

  //   const handleCharacterChange = (index: number) => (e: any) => {
  //     let newArr = [...lines]; // copying the old datas array
  //     newArr[index].character = e.target.value; // replace e.target.value with whatever you want to change it to
  //     setLines(newArr);
  // }
    

    const renderLine = (line: { id: number; text: string, character: string, time: Date | null, selectedVariable: string, switchStatus: boolean, yesAnswer: string, noAnswer: string, timeoutAnswer: string}, index: number, dayIndex: number) => {
      return (
        <Card
          key={line.id}
          dayIndex={dayIndex}
          index={index}
          id={line.id}
          text={line.text}
          character={line.character}
          switchStatus={line.switchStatus}
          time={line.time}
          yesAnswer={line.yesAnswer}
          noAnswer={line.noAnswer}
          timeoutAnswer={line.timeoutAnswer}
          variable={line.selectedVariable}
          moveCard={moveCard}
          handleChange={handleChangeText}
          handleCharacterChange={handleCharacterChange}
          handleVariableChange={handleVariableChange}
          insertVariable={insertVariable}
          handleChangeTime={handleChangeTime}
          toggleSwitch={toggleSwitch}
          handleChangeYesAnswer={handleChangeYesAnswer} 
          handleChangeNoAnswer={handleChangeNoAnswer} 
          handleChangeTimeoutAnswer={handleChangeTimeoutAnswer}
        />
      )
    }

    return (
      <Paper
            sx={{
                backgroundColor:'lightblue',
                margin: '0 10px 10px 10px',
                padding: '10px'
            }}
            >
        <h1> Day {day.ix + 1}</h1>
        <Button variant="contained" 
        onClick={() => addLine(day.ix)}
        >Add Line
        </Button>
        <div>{lines.map((line, i) => renderLine(line, i, day.ix))}</div>
      </Paper>
    )
  }
}