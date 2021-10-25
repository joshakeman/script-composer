import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

interface TimeProps {
    time: Date | null
    setTime: React.Dispatch<React.SetStateAction<Date | null>>
  }

export default function BasicTimePicker({ time, setTime }: TimeProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Line time"
        value={time}
        onChange={(newValue) => {
          setTime(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
