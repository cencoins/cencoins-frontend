import { Box, Grid, useTheme } from "@mui/material";
import Image from "next/image";

interface Props {
  iconUrl?: Nullable<string>;
  name: string;
  pair?: string;
  symbol?: string;
}

export const TableCellCoin: React.FC<Props> = ({ name, symbol, iconUrl }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={1} alignItems="center" flexWrap="nowrap">
      {iconUrl && (
        <Grid item position="relative" width="32px" height="32px">
          <Image
            unoptimized
            alt={`${name} logo`}
            width="32"
            height="32"
            src={iconUrl}
            style={{
              objectFit: "contain",
              borderRadius: "50%",
              position: "absolute",
              minHeight: 32,
              minWidth: 32,
              top: 0,
              right: 0,
              overflow: "hidden",
            }}
          />
        </Grid>
      )}
      <Grid item container flexDirection="column" spacing={0.5}>
        {name && <Grid item>{name}</Grid>}
        {symbol && (
          <Grid item>
            <Box color={theme.palette.text.secondary}>{symbol}</Box>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
