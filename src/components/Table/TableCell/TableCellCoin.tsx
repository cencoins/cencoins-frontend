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
    <Grid container spacing={1} alignItems="center" flexWrap="nowrap">
      {logo && (
        <Grid item display="inline-flex" alignItems="center">
          <Image alt={`${name} logo`} width={32} height={32} src={logo} />
        </Grid>
      )}
      <Grid item container flexDirection="column" spacing={0.5}>
        {name && <Grid item>{name}</Grid>}
        {shortName && (
          <Grid item>
            <Box color={theme.palette.text.secondary}>{shortName}</Box>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
