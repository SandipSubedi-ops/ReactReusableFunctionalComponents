import React, { ChangeEvent } from "react";
import { Box, TextField } from "@mui/material";

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export interface FileInput {
  file?: string | null;
  fileName?: string | null;
  filePath?: string | null;
  fileExtention?: string | null;
  /** @format double */
  fileSize?: number | null;
}

interface FileUploadProps {
  name: string;
  label: string;
  accept: string;
  helperText?: string | undefined;
  value?: string | undefined | null;
  onChange?: (data: FileInput) => void; // Optional external onChange callback
}

const FileInputWithoutControl: React.FC<FileUploadProps> = ({
  name,
  label,
  accept,
  value,
  onChange,
  helperText,
}) => {
  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64file = await convertToBase64(file);
      const roomFile: FileInput = {
        file: base64file,
        fileName: file.name,
        fileExtention: file.name.split(".").pop() || "",
        fileSize: file.size,
      };
      if (onChange) {
        onChange(roomFile);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        variant="outlined"
        size="small"
        label={label}
        id={name}
        type="text" // Display as text input for styling
        value={value}
        inputProps={{
          type: "file", // The actual file input type
          accept: accept, // Accept only specified file types (e.g., .jpg, .png)
          onChange: (e: ChangeEvent<HTMLInputElement>) =>
            handleFileInputChange(e), // Pass to handler
        }}
        helperText={helperText} // Show error message
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};

export default FileInputWithoutControl;
