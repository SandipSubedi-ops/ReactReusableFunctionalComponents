import { FormLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
interface BaseDropDownInterface {
  value: string;
  text: string;
}

interface RadioInputPropType {
  rules?: any;
  name: string;
  radioOptions: BaseDropDownInterface[];
  label?: string; // Optional label prop
  disabled?: boolean;
  value: number | string | boolean;
  onChange?: (value: any, name: string) => void;
}

function RadioInputWithOutControl({
  rules,
  name,
  radioOptions,
  label,
  disabled = false,
  value,
  onChange,
}: RadioInputPropType) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    const selectedObj = radioOptions.find((opt) => opt.value === selectedValue);
    if (onChange) {
      onChange(selectedObj, name); // Trigger the custom onChange function
    }
  };
  return (
    <FormControl
      sx={{ display: "flex" }}
      onChange={handleChange}
      size="small"
      variant="outlined"
    >
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup row value={value ?? ""}>
        {radioOptions.map((opt, idx) => (
          <FormControlLabel
            key={idx}
            value={opt.value}
            control={<Radio disabled={disabled} />}
            label={opt.text}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioInputWithOutControl;
