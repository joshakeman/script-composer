import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

interface TimeProps {
    time: Date | null
    setTime: any
    dayIndex: number
    lineIndex: number
  }

export default function BasicTimePicker({ time, setTime, dayIndex, lineIndex }: TimeProps) {
    useEffect(() => {
    }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Line time"
        value={time}
        onChange={(newVal) => {
            setTime(dayIndex, lineIndex, newVal)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
