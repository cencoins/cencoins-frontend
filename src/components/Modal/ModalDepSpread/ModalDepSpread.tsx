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
import { Box, Chip, Grid, TextField, useTheme } from "@mui/material";
import {
  $modalDepSpread,
  onChangeModalDepSpread,
} from "@/stores/modalDepSpread";

export const ModalDepSpread: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  const store = useUnit($modalDepSpread);

  const handleClose = () => {
    onChangeModalDepSpread({ open: false });
  };

  return (
    <Dialog
      onClose={handleClose}
      open={store.open}
      PaperProps={{
        sx: { width: 434, minHeight: 644, p: 3 },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 3 }}>
        <Typography variant="h6">{t("Депозит и спред")}</Typography>
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
        <Grid container flexDirection="column" spacing={4}>
          <Grid item>
            <Box mb={2}>
              <Box>
                <Typography mb={2}>{t("Укажите доступный депозит")}</Typography>
                <TextField fullWidth placeholder="100$" />
              </Box>
            </Box>
            <Box mb={2}>
              <Box>
                <Box mb={1.2}>
                  <Typography variant="caption" color="text.secondary">
                    {t("Популярные варианты")}
                  </Typography>
                </Box>
                <Grid container spacing={1.5}>
                  {[
                    "10",
                    "20",
                    "50",
                    "100",
                    "200",
                    "500",
                    "1000",
                    "2000",
                    "5000",
                    "7500",
                  ].map((item) => (
                    <Grid item key={item}>
                      <Chip
                        label={item}
                        style={{
                          cursor: "pointer",
                          padding: theme.spacing(1, 0.5),
                          borderRadius: theme.spacing(1),
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <Box mb={2}>
              <Box>
                <Typography mb={2}>{t("Желаемый спред")}</Typography>
                <TextField fullWidth placeholder="1%" />
              </Box>
            </Box>
            <Box>
              <Box mb={1.2}>
                <Typography variant="caption" color="text.secondary">
                  {t("Популярные варианты")}
                </Typography>
              </Box>

              <Box mb={1.2}>
                <Grid container spacing={1.5}>
                  {["> 0,5%", "> 1%", "> 1,5%", "> 2%", "> 3%"].map((item) => (
                    <Grid item key={item}>
                      <Chip
                        label={item}
                        style={{
                          cursor: "pointer",
                          padding: theme.spacing(1, 0.5),
                          borderRadius: theme.spacing(1),
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Typography
                style={{
                  fontSize: 12,
                  lineHeight: "14px",
                  color: theme.palette.text.secondary,
                }}
              >
                {t(
                  "Рекомендуем указывать значение не более 1% для большей выдачи результатов",
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ padding: 0 }}>
        <Button autoFocus onClick={handleClose} fullWidth variant="contained">
          {t("Сохранить")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
