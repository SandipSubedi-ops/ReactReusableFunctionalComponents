import { FormLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Controller } from "react-hook-form";

interface BaseDropDownInterface {
  value: string;
  text: string;
}

interface RadioInputPropType {
  control: any;
  rules?: any;
  name: string;
  radioOptions: BaseDropDownInterface[];
  label?: string; // Optional label prop
  disabled?: boolean;
  value?: string | number;
  onChange?: (value: any, name: string) => void;
}

function RadioInput({
  control,
  rules,
  name,
  radioOptions,
  label,
  disabled = false,
  onChange,
  value,
}: RadioInputPropType) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const { value: insideValue, ...restFieldOpts } = field;
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const selectedValue = event.target.value;
          const selectedObj = radioOptions.find(
            (opt) => opt.value === selectedValue
          );
          if (onChange) {
            onChange(selectedObj, name); // Trigger the custom onChange function
          }
        };
        return (
          <FormControl
            error={!!fieldState.error}
            sx={{ display: "flex" }}
            onChange={handleChange}
            size="small"
            variant="outlined"
          >
            {label && <FormLabel>{label}</FormLabel>}
            <RadioGroup row value={value ?? ""} {...restFieldOpts}>
              {radioOptions.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  value={opt.value}
                  control={<Radio disabled={disabled} />}
                  label={opt.text}
                />
              ))}
            </RadioGroup>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    ></Controller>
  );
}

export default RadioInput;
