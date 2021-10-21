import { FC, useState, useCallback } from 'react'
import { Card } from './Card'
import Button from '@mui/material/Button';
import update from 'immutability-helper'

const style = {
  width: 400,
}

export interface Line {
  id: number
  text: string
}

export interface ContainerState {
  lines: Line[]
}

export const Container: FC = () => {
  {
    const [lines, setLines] = useState([{id:1, text:""}])

    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = lines[dragIndex]
        setLines(
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

    const handleChange = (index: number) => (e: any) => {
        let newArr = [...lines]; // copying the old datas array
        newArr[index].text = e.target.value; // replace e.target.value with whatever you want to change it to
        setLines(newArr);
    }

    const renderLine = (line: { id: number; text: string }, index: number) => {
      return (
        <Card
          key={line.id}
          index={index}
          id={line.id}
          text={line.text}
          moveCard={moveCard}
          handleChange={handleChange}
        />
      )
    }

    return (
      <>
        <Button variant="contained" onClick={() => setLines(oldArray => [...oldArray, {id:lines.length+1, text:""}])}>Add Line</Button>
        <div style={style}>{lines.map((line, i) => renderLine(line, i))}</div>
      </>
    )
  }
}