import Box from "@mui/material/Box";
import ThemeModeToggler from "../ThemeModeToggler/ThemeModeToggler";
import { toggleModalSignIn } from "@/stores/modals/ModalSignIn.effector";
import { toggleModalSignUp } from "@/stores/modals/ModalSignUp.effector";
import { Link } from "@mui/material";

interface Props {
  colorInvert?: boolean;
}

const NavigationTop = ({ colorInvert = false }: Props): JSX.Element => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
      <Box marginRight={{ xs: 1, sm: 2 }}>
        <Link
          underline="none"
          component="a"
          style={{ cursor: "pointer" }}
          onClick={() => toggleModalSignIn()}
          color={colorInvert ? "common.white" : "text.primary"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          Log In
        </Link>
      </Box>
      <Box marginRight={{ xs: 1, sm: 2 }}>
        <Link
          underline="none"
          component="a"
          style={{ cursor: "pointer" }}
          onClick={() => toggleModalSignUp()}
          color={colorInvert ? "common.white" : "text.primary"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          Sign up
        </Link>
      </Box>
      <Box>
        <ThemeModeToggler />
      </Box>
    </Box>
  );
};

export default NavigationTop;
