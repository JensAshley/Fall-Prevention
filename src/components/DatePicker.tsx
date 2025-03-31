/**
 * A reusable component that renders a date picker using the react-datepicker library.
 *
 * @param {DatePickerProps} props - The props for the DatePickerComponent.
 * @param {Date} props.selected - The currently selected date.
 * @param {(date: Date) => void} props.onChange - The callback function to be called when the selected date changes.
 * @returns {JSX.Element} The rendered DatePickerComponent.
 */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  text: string;
  selected: Date;
  onChange: (date: Date) => void;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  //text,
  selected,
  onChange,
}) => {
  const [startDate, setStartDate] = useState(selected);

  const handleChange = (date: Date) => {
    setStartDate(date);
    onChange(date);
  };

  return (
    <div>
      {/* <br />
      <label style={{fontSize: "18px", textAlign: "left"}}>{text} </label> */}
      <DatePicker
        placeholderText="Select a date"
        selected={startDate}
        onChange={handleChange}
      />
    </div>
  );
};

export default DatePickerComponent;
