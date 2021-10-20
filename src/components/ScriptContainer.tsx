import React, {useState, useCallback} from 'react'
import TextBox from './TextBox'
import Button from '@mui/material/Button';
import { Line } from './Constants'
import update from 'immutability-helper'

export default function ScriptContainer() {
    const [lines, setLines] = useState(Array<Line>())

    const moveLine = useCallback(
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

    return (
        <div style={{width:600, margin:'0 auto'}}>
            <Button variant="contained" onClick={() => setLines(oldArray => [...oldArray, {id:lines.length+1, content:""}])}>Add Line</Button>
            {
                lines.map((line, i) => {
                    return (
                        <TextBox index={i} text={line.content} id={line.id} moveLine={moveLine} updateArray={setLines}/>
                    )
                })
            }
        </div>
    )
}
