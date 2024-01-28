import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useTheme } from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";

export const Email: React.FC = () => {
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
          <EmailIcon
            style={{
              color: theme.palette.grey.A100,
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="body1">Email</Typography>
        <Link href="mailto:info@cencoins.com" passHref legacyBehavior>
          <Typography
            component="a"
            variant="body1"
            color={theme.palette.text.secondary}
          >
            info@cencoins.com
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};
