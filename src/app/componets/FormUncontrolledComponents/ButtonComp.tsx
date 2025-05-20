import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme } from "@mui/material/styles";

interface UniversalButtonProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  loader?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "contained" | "outlined" | "text";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

function UniversalButton({
  label,
  children,
  loading = false,
  disabled = false,
  type,
  variant,
  startIcon,
  endIcon,
  loader,
  sx,
  onClick,
}: UniversalButtonProps) {
  const renderLoader = () =>
    loader || (
      <CircularProgress
        size={10}
        sx={{
          color: "inherit",
          marginRight: label || children ? "6px" : 0,
        }}
      />
    );

  return (
    <Button
      type={type}
      disabled={disabled || loading}
      variant={variant}
      startIcon={loading ? renderLoader() : startIcon}
      endIcon={loading ? undefined : endIcon}
      onClick={onClick}
      sx={sx}
    >
      {loading && !(label || children) ? null : children || label}
    </Button>
  );
}

export default UniversalButton;
