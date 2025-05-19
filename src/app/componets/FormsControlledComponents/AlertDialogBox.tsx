import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogBoxInterface {
  openDialog: boolean | false;
  heading?: string;
  description?: React.ReactNode;
  closeDialogBox?: (data: any) => void;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  otherButtonActions?: {
    buttonElement: React.ReactNode;
    handleButtonClick: (data: any) => void;
  }[];
}

export default function AlertDialogBoxComponent({
  openDialog,
  closeDialogBox,
  otherButtonActions,
  heading,
  description,
  maxWidth = "md",
}: AlertDialogBoxInterface) {
  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDialogBox}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth={maxWidth}
      >
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>{description}</DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={closeDialogBox}>
            Cancel
          </Button>
          {otherButtonActions &&
            otherButtonActions?.map((button, buttonIndex) => (
              <Button
                key={buttonIndex}
                variant="contained"
                type="button"
                onClick={button.handleButtonClick}
              >
                {button.buttonElement}
              </Button>
            ))}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
