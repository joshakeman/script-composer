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
}

export const DayContainer: FC<ContainerProps> = ({ day, setLines, addLine, handleChangeText, handleCharacterChange }) => {
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
    const handleVariableChange = (index: number) => (e: any) => {
      let newArr = [...lines]; // copying the old datas array
      newArr[index].selectedVariable = e.target.value; // replace e.target.value with whatever you want to change it to
      setLines(newArr);
  }

  const insertVariable = (index: number) => {
    let newArr = [...lines]; // copying the old datas array
      newArr[index].variables = [...newArr[index].variables, newArr[index].selectedVariable]; // replace e.target.value with whatever you want to change it to
      newArr[index].text += newArr[index].selectedVariable
      newArr[index].selectedVariable = ""
      setLines(newArr);
  }

    const renderLine = (line: { id: number; text: string, character: string, selectedVariable: string}, index: number, dayIndex: number) => {
      return (
        <Card
          key={line.id}
          dayIndex={dayIndex}
          index={index}
          id={line.id}
          text={line.text}
          character={line.character}
          variable={line.selectedVariable}
          moveCard={moveCard}
          handleChange={handleChangeText}
          handleCharacterChange={handleCharacterChange}
          handleVariableChange={handleVariableChange}
          insertVariable={insertVariable}
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