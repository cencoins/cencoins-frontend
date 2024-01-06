import { light } from "@/theme/palette";
import { Chip, ChipProps, styled } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface Props extends ChipProps {
  active?: boolean;
}

const FilterChip = styled(Chip)<Props>(({ theme, active }) => ({
  background: "#F1F2F5",
  height: 32,
  borderRadius: theme.spacing(2),
  boxShadow: "none",
  cursor: "pointer",
  "& .MuiChip-label, .MuiChip-deleteIcon": {
    color: active
      ? theme.palette.primary.main
      : theme.palette.mode === "dark"
      ? light.text.primary
      : theme.palette.text.primary,
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  "&:hover": {
    "& .MuiChip-label, .MuiChip-deleteIcon": {
      color: theme.palette.primary.main,
      boxShadow: "none",
    },
  },

  "& .MuiChip-label": {
    padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
    background: "transparent",
    fontWeight: 500,
    fontSize: 14,
  },
}));

export const TableFilterChip: React.FC<Props> = (props) => {
  return (
    <FilterChip
      {...props}
      deleteIcon={
        props.active ? (
          <CancelOutlinedIcon style={{ fontSize: 16 }} />
        ) : (
          <ExpandMoreIcon />
        )
      }
    />
  );
};
