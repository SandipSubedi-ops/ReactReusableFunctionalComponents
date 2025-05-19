import { FormControlLabel } from "@mui/material";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller } from "react-hook-form";

interface CheckboxInputPropType extends CheckboxProps {
  name: string;
  rules?: any;
  label: string;
  value?: boolean;
  onChangeFun?: (value: boolean, name: string) => void;
}

function CheckboxInputWithoutControl({
  name,
  rules,
  label,
  onChangeFun,
  value,
  ...props
}: CheckboxInputPropType) {
  // Custom change handler
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    if (onChangeFun) {
      onChangeFun(newValue, name); // Call external onChange if provided
    }
  };
  return (
    <FormControl sx={{ display: "flex" }}>
      <FormControlLabel
        control={
          <Checkbox checked={value} onChange={handleChange} {...props} />
        }
        label={label}
      ></FormControlLabel>
    </FormControl>
  );
}

export default CheckboxInputWithoutControl;
