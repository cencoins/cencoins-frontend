import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useUnit } from "effector-react";
import {
  $modalSignUp,
  toggleModalSignUp,
} from "@/stores/modals/ModalSignUp.effector";

export const ModalSignUp: React.FC = () => {
  const modalSignIn = useUnit($modalSignUp);

  return (
    <Dialog
      open={modalSignIn.open}
      onClose={() => toggleModalSignUp()}
      maxWidth="xs"
    >
      <DialogTitle>Sign Up</DialogTitle>
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
        <Button onClick={() => toggleModalSignUp()}>Cancel</Button>
        <Button onClick={() => toggleModalSignUp()}>Sign Up</Button>
      </DialogActions>
    </Dialog>
  );
};
