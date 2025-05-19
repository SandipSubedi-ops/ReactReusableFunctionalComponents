import React, { ChangeEvent } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
// import { FileInput } from '../../../types/api/data-contracts';
export interface FileInput {
    file?: string | null;
    fileName?: string | null;
    filePath?: string | null;
    fileExtention?: string | null;
    generatedFileName?: string | null;
    /** @format double */
    fileSize?: number | null;
}

interface FileUploadProps {
    name: string;
    control: Control<any>;
    label: string;
    accept: string;
    onChange?: (data: FileInput) => void;  // Optional external onChange callback
}

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const FileInputField: React.FC<FileUploadProps> = ({ name, control, label, accept, onChange }) => {
    const handleFileInputChange = async (
        e: ChangeEvent<HTMLInputElement>,
        fieldOnChange: (value: any) => void
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const base64file = await convertToBase64(file);
            const roomFile: FileInput = {
                file: base64file,
                fileName: file.name,
                fileExtention: file.name.split('.').pop() || ''
            };

            fieldOnChange(roomFile);

            if (onChange) {
                onChange(roomFile);
            }
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const errorMessage = fieldState.error?.message;
                const helperText = typeof errorMessage === 'string' ? errorMessage : undefined;

                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField
                            variant="outlined"
                            size="small"
                            label={label}
                            id={name}
                            type="text"  // Display as text input for styling
                            inputProps={{
                                type: 'file',  // The actual file input type
                                accept: accept,  // Accept only specified file types (e.g., .jpg, .png)
                                onChange: (e: ChangeEvent<HTMLInputElement>) => handleFileInputChange(e, field.onChange)  // Pass to handler
                            }}
                            error={!!fieldState.error}  // Show error state
                            helperText={helperText}  // Show error message
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Box>
                );
            }}
        />
    );
};

export default FileInputField;