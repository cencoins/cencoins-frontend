import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  $modalSignIn,
  onChangeModalSignIn,
  onSubmitModalSignIn,
  toggleModalSignIn,
} from "@/stores/modals/ModalSignIn.effector";
import { useUnit } from "effector-react";

export const ModalSignIn: React.FC = () => {
  const modalSignIn = useUnit($modalSignIn);
  // console.log({ ...modalSignIn });
  return (
    <Dialog
      open={modalSignIn.open}
      onClose={() => toggleModalSignIn()}
      maxWidth="xs"
    >
      <DialogTitle>Log In</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          value={modalSignIn.email}
          onChange={(event) =>
            onChangeModalSignIn({ email: event.currentTarget.value })
          }
          type="email"
          fullWidth
          variant="standard"
          placeholder="Enter your email address..."
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          value={modalSignIn.password}
          onChange={(event) =>
            onChangeModalSignIn({ password: event.currentTarget.value })
          }
          fullWidth
          variant="standard"
          placeholder="Enter your password..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleModalSignIn()}>Cancel</Button>
        <Button
          onClick={() => {
            onSubmitModalSignIn();
          }}
        >
          Log in
        </Button>
      </DialogActions>
    </Dialog>
  );
};
