import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
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
  options: BaseDropDownInterface[];
  disabled?: boolean;
  onChangeFun?: (value: any, name: any) => void;
}

export default function DropDownMultiple({
  name,
  control,
  rules,
  label,
  fullWidth = false,
  options,
  disabled = false,
  onChangeFun,
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
          // console.log(event, "------component----")
          // const selectedOption = options.find(op => op.value === event.target.value);
          if (onChangeFun) {
            onChangeFun(event.target.value, name);
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
              variant="outlined"
              size="small"
              multiple
              renderValue={(selectedOptions) =>
                options
                  .filter((op) => selectedOptions.includes(op.value))
                  .map((op) => op.text)
                  .join("; ")
              }
              input={<OutlinedInput label={label} />}
              fullWidth={fullWidth}
              value={value ?? []}
              {...restFieldOpts}
              disabled={disabled}
              onChange={handleChange}
            >
              {options?.map((op) => (
                <MenuItem key={op.value} value={op.value}>
                  <Checkbox checked={field.value?.indexOf(op.value) > -1} />
                  <ListItemText primary={op.text}></ListItemText>
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    ></Controller>
  );
}
