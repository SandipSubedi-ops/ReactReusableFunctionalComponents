
import { FormControlLabel } from '@mui/material';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Controller } from 'react-hook-form';

interface CheckboxInputPropType extends CheckboxProps {
    name: string;
    control: any;
    rules?: any;
    label: string;
    value?: boolean;
    onChangeFun?: (value: boolean, name: string) => void;
}

function CheckboxInput({
    name,
    control,
    rules,
    label,
    onChangeFun,
    value,
    ...props
}: CheckboxInputPropType) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const { value: filedValue, onChange: fieldOnChange, ...restFieldOpts } = field;

                // Custom change handler
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = event.target.checked;
                    fieldOnChange(newValue); // Update React Hook Form state
                    if (onChangeFun) {
                        onChangeFun(newValue, name); // Call external onChange if provided
                    }
                };
                return (
                    <FormControl
                        error={!!fieldState.error}
                        sx={{ display: 'flex' }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={value ?? filedValue}
                                    onChange={handleChange}
                                    {...restFieldOpts}
                                    {...props}
                                />
                            }
                            label={label}
                        ></FormControlLabel>
                        <FormHelperText>
                            {fieldState.error?.message}
                        </FormHelperText>
                    </FormControl>
                );
            }}
        ></Controller>
    );
}

export default CheckboxInput;