import * as React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Alert, SxProps, Theme, Toolbar } from "@mui/material";

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface CustomSnackbarProps extends SnackbarOrigin {
  message: string;
  open: boolean;
  style?: SxProps<Theme>;
  severity?: "error" | "warning" | "success" | "info";
  variant?: "standard" | "filled" | "outlined";
  type?: "alert";
  autoHideDuration?: number;
  handleClose?: () => void;

  //action to be implementes ? undo close
}
export default function CustomSnackBar(props: CustomSnackbarProps) {
  let intialState: CustomSnackbarProps = {
    message: "",
    open: false,
    vertical: "top",
    horizontal: "center",
  };
  const [state, setState] = React.useState<CustomSnackbarProps>(intialState);
  const { vertical, horizontal } = props;

  React.useEffect(() => {
    setState({ ...props });
  }, [props]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...intialState });
    props.handleClose?.();
  };
  return (
    <div>
      <Snackbar
        sx={props.style}
        anchorOrigin={{ vertical, horizontal }}
        open={state.open}
        onClose={handleClose}
        message={
          props.type && props.type !== "alert" ? state.message : undefined
        }
        key={state.vertical + state.horizontal}
        autoHideDuration={props.autoHideDuration}
      >
        {props.type === "alert" ? (
          <Alert
            elevation={10}
            variant={props.variant}
            severity={props.severity}
            sx={{ width: "100%" }}
            onClose={handleClose}
          >
            {state.message}
          </Alert>
        ) : (
          <></>
        )}
      </Snackbar>
    </div>
  );
}
