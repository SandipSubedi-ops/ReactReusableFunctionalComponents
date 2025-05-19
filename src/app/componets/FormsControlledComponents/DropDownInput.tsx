import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

interface BaseDropDownInterface {
  value: string;
  text: string;
}

interface TextInputPropType {
  name: string;
  control: any;
  rules?: any;
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  options: BaseDropDownInterface[];
  className?: string;
  onChangeFun?: (value: any, name: any) => void;
}

export default function DropDown({
  name,
  control,
  rules,
  label,
  fullWidth = false,
  disabled = false,
  options,
  className,
  onChangeFun,
  ...props
}: TextInputPropType) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const { value, onChange, ...restFieldOpts } = field;
        const handleChange = (event: any) => {
          onChange(event);
          const selectedValue = event.target.value;
          if (selectedValue === "") {
            if (onChangeFun) {
              onChangeFun({ value: "", text: "Select an option" }, name);
            }
          } else {
            const selectedOption = options.find(
              (op) => op.value === event.target.value
            );
            if (onChangeFun && selectedOption) {
              onChangeFun(selectedOption, name);
            }
          }
        };
        return (
          <FormControl
            className="w-full"
            error={!!fieldState.error}
            sx={{
              "& .MuiInputLabel-root": {
                mt: "-7px",
              },
              "& .MuiInputLabel-shrink": {
                mt: "0px",
              },
              display: "flex",
            }}
          >
            <InputLabel>{label}</InputLabel>
            <Select
              // key={value}
              className={className}
              variant="outlined"
              size="small"
              input={<OutlinedInput label={label} />}
              fullWidth={fullWidth}
              disabled={disabled}
              value={value}
              onChange={handleChange}
              {...restFieldOpts}
              {...props}
            >
              <MenuItem value={""}>Select a option</MenuItem>
              {options?.map((op) => (
                <MenuItem key={op.value} value={op.value}>
                  {op.text}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}
