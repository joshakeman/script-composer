import React, {useState, useCallback} from 'react'
import TextBox from './TextBox'
import Button from '@mui/material/Button';
import { Line } from './Constants'
import update from 'immutability-helper'
import { DayContainer } from './DayContainer'
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface ScriptState {
    days: Array<Object>
}
export default function ScriptContainer() {
    const [days, setDays] = useState<ScriptState["days"]>([])

    const addDay = () => {
        setDays(prevState => [...prevState,{}])
    }
    
    const [value, setValue] = React.useState(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    return (
            <div>
                <Button variant="contained" onClick={addDay}>Add Day</Button>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    {
                        days.map((day, index) => <Tab value={index+1} label={index+1} />)
                    }
                </Tabs>
                {days.map((day, index) => <DayContainer index={index}/>)}
            </div>
    )
}
