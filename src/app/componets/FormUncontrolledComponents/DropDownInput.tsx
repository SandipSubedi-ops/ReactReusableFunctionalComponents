import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

interface TextInputPropType {
  name: string;
  rules?: any;
  label: string;
  fullWidth?: boolean;
  disabled?: boolean;
  options: {
    value: number | string;
    text: string;
  }[];
  className?: string;
  onChangeFun?: (value: any, name: any) => void;
  value?: number | string;
}

export default function DropDownWithouControl({
  name,
  rules,
  label,
  fullWidth = false,
  disabled = false,
  options,
  className,
  onChangeFun,
  value,
  ...props
}: TextInputPropType) {
  const handleChange = (event: any) => {
    const selectedOption = options.find(
      (op) => op.value === event.target.value
    );
    if (onChangeFun && selectedOption) {
      onChangeFun(selectedOption, name);
    }
  };
  return (
    <FormControl
      className="w-full"
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
        className={className}
        variant="outlined"
        size="small"
        input={<OutlinedInput label={label} />}
        fullWidth={fullWidth}
        disabled={disabled}
        value={value ?? ""}
        onChange={handleChange}
        {...props}
      >
        {options?.map((op) => (
          <MenuItem key={op.value} value={op.value}>
            {op.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}