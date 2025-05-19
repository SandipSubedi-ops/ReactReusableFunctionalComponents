import TextField, { TextFieldProps } from "@mui/material/TextField";

type DateInputPropType = {
    name: string;
    rules?: any;
    onChangeFun?: (value: any, name: any) => void;
    minDate?: string; // Min date in "YYYY-MM-DD" format
    maxDate?: string; // Max date in "YYYY-MM-DD" format
    value: string | number
} & TextFieldProps;

export default function DateInputWithoutControl({
    name,
    rules,
    label,
    onChangeFun,
    minDate,
    maxDate,
    value,
    ...props
}: DateInputPropType) {


    const handleChange = (event: any) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;

        // Always call react-hook-form's `onChange` method
        // onChange(inputValue);

        // Call additional custom onChange function if provided
        if (onChangeFun) {
            onChangeFun(inputValue, inputName);
        }
    };

    return (
        <TextField
            variant="outlined"
            size="small"
            label={label}
            type="date"
            InputLabelProps={{
                shrink: true,
            }}
            rows={props.multiline ? 4 : 0}
            sx={{ display: "flex" }}
            value={value}
            inputProps={{
                min: minDate,
                max: maxDate,
            }}
            onChange={handleChange}
            {...props}
        />
    );
}