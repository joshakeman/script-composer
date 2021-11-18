import { FC, useRef, useEffect, useState } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { ItemTypes } from './Constants'
import { XYCoord } from 'dnd-core'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TimePicker from './TimePicker'
import Button from '@mui/material/Button';
import QuestionSwitch from './QuestionSwitch'
import QuestionFields from './QuestionFields';

import { useSelector } from 'react-redux';
import { selectCharList } from '../redux/reducers/characters'
import { selectVarList } from '../redux/reducers/variables'

export interface CardProps {
  id: any
  dayIndex: number
  text: string
  character: string
  time: Date | null
  yesAnswer: string 
  noAnswer: string 
  timeoutAnswer: string
  index: number
  variable: string
  switchStatus: boolean
  moveCard: (dragIndex: number, hoverIndex: number) => void
  handleChange: any
  handleCharacterChange: any
  handleVariableChange: any
  insertVariable: any
  handleChangeTime: any
  toggleSwitch: any
  handleChangeYesAnswer: any
  handleChangeNoAnswer: any
  handleChangeTimeoutAnswer: any
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const Card: FC<CardProps> = ({ id, dayIndex, text, variable, character, time, switchStatus, yesAnswer, noAnswer, timeoutAnswer, index, moveCard, handleChange, handleCharacterChange, handleVariableChange, insertVariable, handleChangeTime, toggleSwitch, handleChangeYesAnswer, handleChangeNoAnswer, handleChangeTimeoutAnswer }) => {
  useEffect(() => {
    }, []);
  
  const charList = useSelector(selectCharList);
  const varList = useSelector(selectVarList);

  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      console.log("Before reset index: ",item.index)
      item.index = hoverIndex
      console.log("After reset index: ",item.index)
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
      <>
    <Paper
    elevation={3}
    data-handler-id={handlerId}
    sx={{padding:'12px',
        backgroundColor:'#f5f5f5',
        cursor: 'move',
        margin: '10px 0',
        width: '90%',
        opacity
    }}
    ref={ref}
    >
        <div style={{textAlign:'left'}}>Line {index+1}</div>
        <div className="toolbar">
          <FormControl sx={{width:'250px', textAlign:'center', marginRight: '10px'}}>
              <InputLabel id="demo-simple-select-label">Character</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={character}
              label="Character"
              onChange={handleCharacterChange(dayIndex, index)}
              >
                {
                  charList.map((char: any) => <MenuItem value={char.name}>{char.name}</MenuItem>)
                }
              </Select>
          </FormControl>
          <FormControl sx={{width:'250px', textAlign:'center'}}>
              <InputLabel id="demo-simple-select-label">Select Variable</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={variable}
              label="Variable"
              onChange={handleVariableChange(dayIndex, index)}
              >
                {
                  varList.map((vari: any) => <MenuItem value={vari.name}>{vari.name}</MenuItem>)
                }
              </Select>
          </FormControl>
          <Button
            sx={{ margin: '0 10px 0 5px' }}
            disabled={variable === ""}
            variant="contained"
            color="secondary"
            onClick={() => insertVariable(dayIndex, index)}
          >
            Add
          </Button>
          <TimePicker time={time} setTime={handleChangeTime} dayIndex={dayIndex} lineIndex={index} />
        </div>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          fullWidth={true}
          value={text}
          onChange={handleChange(dayIndex, index)}
          sx={{ 
              backgroundColor: 'white', 
              opacity 
          }}
        />
        <QuestionSwitch checked={switchStatus} handleChange={toggleSwitch} dayIndex={dayIndex} lineIndex={index} />
        {
          switchStatus === true ? (
            <QuestionFields 
              dayIndex={dayIndex} 
              lineIndex={index}
              yesAnswer={yesAnswer}
              noAnswer={noAnswer} 
              timeoutAnswer={timeoutAnswer} 
              handleChangeYesAnswer={handleChangeYesAnswer} 
              handleChangeNoAnswer={handleChangeNoAnswer} 
              handleChangeTimeoutAnswer={handleChangeTimeoutAnswer}
              />
          ) : (
            null
          )
        }
        </Paper>
    </>
  )
}
