import { $modalAddCoin, onChangeModalAdd } from "@/stores/modalAddCoin";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useUnit } from "effector-react";
import { useTranslation } from "next-i18next";
import {
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  TextField,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useState } from "react";

export const data = [
  {
    name: "Toncoin",
    shortName: "TON",
    logo: "/images/ton.svg",
  },
  {
    name: "Bybit",
    shortName: "BBT",
    logo: "/images/bybit.svg",
  },
];

export const ModalAddCoin: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  const store = useUnit($modalAddCoin);
  const [checked, setChecked] = useState<string[]>([]);

  const handleClose = () => {
    onChangeModalAdd({ open: false });
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={store.open}
      PaperProps={{
        sx: { minWidth: 434, minHeight: 644, p: 3 },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 3 }}>
        <Typography variant="h6">{t("Добавьте монеты")}</Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        size="medium"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent style={{ padding: 0, marginBottom: 24 }}>
        <Grid container flexDirection="column">
          <Grid item>
            <TextField
              size="small"
              placeholder={t("Поиск")}
              InputProps={{ startAdornment: <SearchIcon /> }}
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: (theme) => theme.spacing(1),
                },
                "& .MuiInputBase-input": {
                  padding: "8px 12px",
                },
              }}
            />
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Checkbox defaultChecked />
              </Grid>
              <Grid item>
                <Typography>{t("Показать добавленные")}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <List>
          {data.map((item, index) => (
            <ListItem key={item.name + index} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(item.name)}
                dense
              >
                <Grid item container>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Grid item>
                      <Grid container spacing={0.5} alignItems="center">
                        <Grid
                          item
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: 4,
                          }}
                        >
                          <Image
                            alt={`${item.name} logo`}
                            width={32}
                            height={32}
                            src={item.logo}
                          />
                        </Grid>
                        <Grid item>
                          <Typography>{item.name}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography color={theme.palette.text.secondary}>
                            {item.shortName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(item.name) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions style={{ padding: 0 }}>
        <Button autoFocus onClick={handleClose} fullWidth variant="contained">
          {t("Сохранить")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
