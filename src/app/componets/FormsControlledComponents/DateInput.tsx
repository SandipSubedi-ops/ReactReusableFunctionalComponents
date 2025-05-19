import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller } from "react-hook-form";

type DateInputPropType = {
  name: string;
  control: any;
  rules?: any;
  onChangeFun?: (value: any, name: any) => void;
  minDate?: string; // Min date in "YYYY-MM-DD" format
  maxDate?: string; // Max date in "YYYY-MM-DD" format
} & TextFieldProps;

export default function DateInput({
  name,
  control,
  rules,
  label,
  onChangeFun,
  minDate,
  maxDate,
  ...props
}: DateInputPropType) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const { value, onChange, ...restFieldOpts } = field;

        const handleChange = (event: any) => {
          const inputValue = event.target.value;
          const inputName = event.target.name;

          // Always call react-hook-form's `onChange` method
          onChange(inputValue);

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
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
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
            {...restFieldOpts}
            {...props}
          />
        );
      }}
    />
  );
}
