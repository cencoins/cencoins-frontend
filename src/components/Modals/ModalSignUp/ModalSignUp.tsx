import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useUnit } from "effector-react";
import {
  $modalSignUp,
  onChangeModalSignUp,
  onSubmitModalSignUp,
  toggleModalSignUp,
} from "@/stores/modals/ModalSignUp.effector";
import { Typography } from "@mui/material";

export const ModalSignUp: React.FC = () => {
  const modalSignUp = useUnit($modalSignUp);

  return (
    <Dialog
      open={modalSignUp.open}
      onClose={() => toggleModalSignUp()}
      maxWidth="xs"
    >
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="email"
          fullWidth
          variant="standard"
          placeholder="Enter your name..."
          value={modalSignUp.name}
          onChange={(event) =>
            onChangeModalSignUp({ name: event.currentTarget.value })
          }
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          placeholder="Enter your email address..."
          value={modalSignUp.email}
          onChange={(event) =>
            onChangeModalSignUp({ email: event.currentTarget.value })
          }
        />
        <TextField
          required
          autoFocus
          margin="dense"
          id="password"
          label="Password"
          type="password"
          inputProps={{ minLength: 8 }}
          fullWidth
          variant="standard"
          placeholder="Enter your password..."
          value={modalSignUp.password}
          onChange={(event) =>
            onChangeModalSignUp({ password: event.currentTarget.value })
          }
        />
        {Boolean(modalSignUp.error?.length) && (
          <Typography color="red">{modalSignUp.error![0]}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleModalSignUp()}>Cancel</Button>
        <Button
          onClick={() => {
            onSubmitModalSignUp();
          }}
        >
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};
