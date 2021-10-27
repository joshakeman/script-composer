import React, { useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export interface SwitchProps {
    checked: boolean
    handleChange: any
    dayIndex: number
    lineIndex: number
}

export default function SwitchLabels({ checked, handleChange, dayIndex, lineIndex }: SwitchProps) {
    useEffect(() => {
    }, []);
    
  return (
    <FormGroup>
      <FormControlLabel 
      control={
      <Switch 
      checked={checked}
      onChange={handleChange(dayIndex, lineIndex)}
      inputProps={{ 'aria-label': 'controlled' }} 
      />} 
      label="Question" />
    </FormGroup>
  );
}