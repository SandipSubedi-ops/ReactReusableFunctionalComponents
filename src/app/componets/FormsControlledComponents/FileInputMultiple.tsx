import React, { useEffect, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { globalTriggerSnackbar } from "@/app/providers/GlobalSnakBarProviders";

export interface FileInput {
  file?: string | null;
  fileName?: string | null;
  filePath?: string | null;
  fileExtention?: string | null;
  /** @format double */
  fileSize?: number | null;
}
export interface ImageFile extends FileInput {
  preview: string;
}

interface ImageComponentProps extends DropzoneOptions {
  maxFiles?: number;
  onUpload?: (files: ImageFile[]) => void;
  imageFileList: ImageFile[];
}

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function MultipleFileInputComponent({
  maxFiles = 4,
  onUpload,
  imageFileList,
  ...dropzoneOptions
}: ImageComponentProps) {
  const [images, setImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    setImages(imageFileList);
  }, [imageFileList.length]);

  const handleImageUpload = async (
    acceptedFiles: File[],
    fieldOnChange: (value: ImageFile[]) => void
  ) => {
    if (images.length + acceptedFiles.length > maxFiles) {
      globalTriggerSnackbar(
        `You can upload a maximum of ${maxFiles} images at a time.`
      );
      return;
    }
    const newImages = await Promise.all(
      acceptedFiles.map(async (file) => {
        const base64file = await convertToBase64(file);

        return {
          file: base64file, // Store the base64 representation
          preview: URL.createObjectURL(file),
          fileName: file.name,
          fileSize: file.size,
          fileExtention: file.name.split(".").pop() || null,
        } as ImageFile;
      })
    );
    if (newImages.length > 0) {
      newImages.forEach((image: ImageFile) => {
        if (image.fileSize && image?.fileSize >= 5242880) {
          globalTriggerSnackbar(
            image?.fileName + " is greater than 5MB. Please keep it under 5MB!",
            "error"
          );
        }
      });
    }

    setImages((prevImages) => [
      ...prevImages,
      ...newImages.filter((x) => (x.fileSize || 0) <= 5242880),
    ]);

    fieldOnChange([
      ...images,
      ...newImages.filter((x) => (x.fileSize || 0) <= 5242880),
    ]);

    if (onUpload) {
      onUpload([
        ...images,
        ...newImages.filter((x) => (x.fileSize || 0) <= 5242880),
      ]);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    handleImageUpload(acceptedFiles, (updatedImages) => {});
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    ...dropzoneOptions,
    accept: {
      "image/*": [], // Accept all image types
    },
    multiple: true, // Allow multiple files to be dropped
  });

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    if (onUpload) {
      onUpload(updatedImages);
    }
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed gray",
          borderRadius: 2,
          p: 2,
          textAlign: "center",
          cursor: "pointer",
          mb: 2,
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1">
          Drag and drop images here, or click to select files
        </Typography>
      </Box>

      {images.length > 0 && (
        <Grid container spacing={2}>
          {images.map((image, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={image.preview}
                    alt={`preview-${index}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Box sx={{ p: 1 }}>
                    <Typography variant="subtitle2">
                      {image.fileName}
                    </Typography>
                    <Typography variant="caption">
                      Size: {((image.fileSize || 0) / 1024).toFixed(2)} KB
                      {image.fileExtention && ` (.${image.fileExtention})`}
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{ position: "absolute", top: 8, right: 8 }}
                    onClick={() => handleDeleteImage(index)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
