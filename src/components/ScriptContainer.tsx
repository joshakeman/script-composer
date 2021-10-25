import React, {useState, useCallback} from 'react'
import TextBox from './TextBox'
import Button from '@mui/material/Button';
import { Line } from './Constants'
import update from 'immutability-helper'
import { DayContainer } from './DayContainer'
import Paper from '@mui/material/Paper';

interface Day {
}
export default function ScriptContainer() {
    const [days, setDays] = useState([{},{},{},{},{}])

    return (
            <div>
                {days.map((day, index) => <DayContainer index={index}/>)}
            </div>
    )
}
