import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  $modalSignIn,
  toggleModalSignIn,
} from "@/stores/modals/ModalSignIn.effector";
import { useUnit } from "effector-react";

export const ModalSignIn: React.FC = () => {
  const modalSignIn = useUnit($modalSignIn);

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
          fullWidth
          variant="standard"
          placeholder="Enter your password..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleModalSignIn()}>Cancel</Button>
        <Button onClick={() => toggleModalSignIn()}>Log in</Button>
      </DialogActions>
    </Dialog>
  );
};