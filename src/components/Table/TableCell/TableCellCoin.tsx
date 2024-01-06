import { Box, Grid, useTheme } from "@mui/material";
import Image from "next/image";

interface Props {
  name?: string;
  shortName?: string;
  logo?: string;
}

export const TableCellCoin: React.FC<Props> = ({ name, shortName, logo }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={1} alignItems="center">
      {logo && (
        <Grid item>
          <Image alt={`${name} logo`} width={32} height={32} src={logo} />
        </Grid>
      )}
      <Grid item>
        {name && <Box>{name}</Box>}
        {shortName && (
          <Box color={theme.palette.text.secondary}>{shortName}</Box>
        )}
      </Grid>
    </Grid>
  );
};
