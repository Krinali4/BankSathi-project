import React, { useState } from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function CommonDatepicker({ onChange, value, classname }) {
 
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DemoItem label="Date of Birth">
          <DatePicker value={value}
            onChange={(date) => onChange(date)}
            className={classname} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default CommonDatepicker;
