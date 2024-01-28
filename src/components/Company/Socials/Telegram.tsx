import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PhoneIcon from "@mui/icons-material/Phone";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useTheme } from "@mui/material";

export const Telegram: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={40}
          height={40}
          borderRadius="50%"
          sx={{ backgroundColor: theme.palette.secondary.dark }}
        >
          <PhoneIcon
            style={{
              color: theme.palette.grey.A100,
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="body1">Telegram</Typography>
        <Link href="https://teleg.run/cencoins" passHref legacyBehavior>
          <Typography
            component="a"
            variant="body1"
            color={theme.palette.text.secondary}
          >
            @cencoins
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};
