import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller } from "react-hook-form";

type TextInputPropType = {
  name: string;
  rules?: any;
  type?: "text" | "number" | "email" | "password";
  onChangeFun?: (value: any, name: string) => void;
  onBlurFun?: (value: any, name: string) => void;
  minDate?: string; // Min date in "YYYY-MM-DD" format
  maxDate?: string; // Max date in "YYYY-MM-DD" format
  value: string | number;
} & TextFieldProps;

export default function TextInputWithoutControl({
  name,
  rules,
  label,
  type = "text",
  onChangeFun,
  onBlurFun,
  minDate,
  maxDate,
  value,
  ...props
}: TextInputPropType) {
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
  const handleBlur = (event: any) => {
    const inputValue = event.target.value;
    const inputName = event.target.name;

    // Call react-hook-form's `onChange`
    // onChange(inputValue);

    // Call custom `onChangeFun` if provided
    if (onBlurFun) {
      onBlurFun(inputValue, inputName);
    }
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      label={label}
      type={type}
      InputLabelProps={{
        shrink: true,
      }}
      rows={props.multiline ? 4 : 0}
      sx={{ display: "flex" }}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  );
}
