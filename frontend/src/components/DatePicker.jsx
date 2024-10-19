import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePicker = ({
    placeholder = 'Select date',
    className,
    initialValue,
    dateFormat = 'dd/MM/yyyy',
    onChange,
    ...restProps
}) => {
    const [selectedDate, setSelectedDate] = useState(initialValue);

    const handleDateChange = (newDate) => {
        const formattedDate = newDate instanceof Date ? newDate.toISOString() : '';
        setSelectedDate(newDate);
        onChange?.(formattedDate);
    };

    return (
        <div className={className}>
            <ReactDatePicker
                dateFormat={dateFormat}
                placeholderText={placeholder}
                selected={selectedDate ? new Date(selectedDate) : null}
                onChange={handleDateChange}
                {...restProps}
            />
        </div>
    );
};

const DatePickerRange = ({
    startDate,
    endDate,
    placeholder = 'Select range',
    className,
    dateFormat = 'dd/MM/yyyy',
    onChange,
    ...restProps
}) => {
    const [startDateValue, setStartDate] = useState(startDate);
    const [endDateValue, setEndDate] = useState(endDate);

    const handleDateChange = ([newStartDate, newEndDate]) => {
        const formattedStartDate = newStartDate instanceof Date ? newStartDate.toISOString() : '';
        const formattedEndDate = newEndDate instanceof Date ? newEndDate.toISOString() : '';
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        onChange?.([formattedStartDate, formattedEndDate]);
    };

    return (
        <div className={className}>
            <ReactDatePicker
                dateFormat={dateFormat}
                placeholderText={placeholder}
                startDate={startDateValue ? new Date(startDateValue) : null}
                endDate={endDateValue ? new Date(endDateValue) : null}
                onChange={handleDateChange}
                selectsRange
                {...restProps}
            />
        </div>
    );
};

DatePicker.Range = DatePickerRange;
// DatePicker.DateTime = (props) => <DatePicker dateFormat="dd/MM/yyyy h:mm aa" showTimeSelect {...props} />;
// DatePicker.Time = (props) => <DatePicker dateFormat="h:mm aa" showTimeSelect showTimeSelectOnly {...props} />;

export default DatePicker;