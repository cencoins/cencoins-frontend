import { useCallback, useMemo, useState } from "react";
import { light } from "@/theme/palette";
import {
  Box,
  Chip,
  ChipProps,
  Menu,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useTranslation } from "next-i18next";

interface Props extends ChipProps {
  open?: boolean;
  active?: boolean;
  options?: any[];
}

const FilterChip = styled(Chip)<Props>(({ theme, active }) => ({
  background: theme.palette.grey[200],
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
    backgroundColor: theme.palette.grey[200],
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
  const { t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);
  const [value, setValue] = useState<string>("");
  const open = Boolean(anchorEl);

  const options = useMemo(() => {
    if (value.length && props.options) {
      return props.options.filter((option) =>
        option.title.toLowerCase().includes(value.toLowerCase()),
      );
    }

    return props.options ?? [];
  }, [props.options, value]);

  const deleteIcon = useMemo(() => {
    if (props.active) {
      return <CancelOutlinedIcon style={{ fontSize: 16 }} />;
    }

    if (open || props.open) {
      return <ExpandMoreIcon style={{ transform: "rotate(180deg)" }} />;
    }

    return <ExpandMoreIcon />;
  }, [props.active, props.open, open]);

  const handleOnClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleOnChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    setValue("");
  }, []);

  return (
    <>
      <FilterChip {...props} deleteIcon={deleteIcon} onClick={handleOnClick} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onKeyDown={(event) => event.stopPropagation()}
        style={{
          top: 8,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            width: 350,
          },
        }}
      >
        <Box px={1} mb={1.5}>
          <TextField
            fullWidth
            autoFocus
            autoComplete="false"
            autoCorrect="false"
            size="small"
            value={value}
            placeholder={t("Поиск")}
            onKeyDown={(event) => event.stopPropagation()}
            onChange={handleOnChangeInput}
            InputProps={{ startAdornment: <SearchIcon /> }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: (theme) => theme.spacing(1),
              },
              "& .MuiInputBase-input": {
                padding: "8px 12px",
              },
            }}
          />
        </Box>
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={handleClose}
            onKeyDown={(event) => event.stopPropagation()}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
