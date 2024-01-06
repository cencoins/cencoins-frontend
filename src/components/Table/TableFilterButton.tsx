import { light } from "@/theme/palette";
import { Button, ButtonProps, styled } from "@mui/material";

interface Props extends ButtonProps {
  active?: boolean;
}

export const TableFilterButton = styled(Button)<Props>(({ theme, active }) => ({
  background: theme.palette.grey[200],
  height: 32,
  color: active
    ? theme.palette.primary.main
    : theme.palette.mode === "dark"
    ? light.text.primary
    : theme.palette.text.primary,
  fontWeight: 500,
  fontSize: 14,
  borderRadius: theme.spacing(1),
  padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
  boxShadow: "none",
  "&:hover": {
    color: theme.palette.primary.main,
    background: theme.palette.grey[200],
    boxShadow: "none",
  },
}));
