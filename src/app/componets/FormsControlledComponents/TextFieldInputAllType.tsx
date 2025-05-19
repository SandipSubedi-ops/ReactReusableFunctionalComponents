import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller } from "react-hook-form";

type TextInputPropType = {
  name: string;
  control: any;
  rules?: any;
  type?: "text" | "number" | "email" | "password" | "color" | "time";
  onChangeFun?: (value: any, name: string) => void;
  onBlurFun?: (value: any, name: string) => void;
} & TextFieldProps;

export default function TextInput({
  name,
  control,
  rules,
  label,
  type = "text",
  onChangeFun,
  onBlurFun,
  ...props
}: TextInputPropType) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const { value, onChange, onBlur, ...restFieldOpts } = field;

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

        const handleBlur = (event: any) => {
          const inputValue = event.target.value;
          const inputName = event.target.name;

          // Call react-hook-form's `onChange`
          onChange(inputValue);

          // Call custom `onChangeFun` if provided
          if (onBlurFun) {
            onBlurFun(inputValue, inputName);
          }
        };

        // Handle time input value formatting
        const getInputValue = () => {
          if (type === "time" && value) {
            // If value is a Date object, convert to time string
            if (value instanceof Date) {
              return value.toTimeString().substring(0, 5);
            }
            // If value is already in HH:MM format, return as is
            if (typeof value === "string" && value.match(/^\d{2}:\d{2}$/)) {
              return value;
            }
          }
          return value || "";
        };

        return (
          <TextField
            variant="outlined"
            size="small"
            label={label}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            type={type}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              ...(type === "time" && { step: 300 }), // 5 minute steps for time input
            }}
            rows={props.multiline ? 4 : 0}
            sx={{ display: "flex" }}
            value={getInputValue()}
            onChange={handleChange}
            onBlur={handleBlur}
            {...restFieldOpts}
            {...props}
          />
        );
      }}
    />
  );
}