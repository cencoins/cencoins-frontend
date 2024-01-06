import { Box, Icon, useTheme } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  isFavourite: boolean;
  onClick?: () => void;
}

export const TableCellFavourite: React.FC<Props> = ({
  isFavourite,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Box
      style={{
        cursor: "pointer",
      }}
    >
      <Icon onClick={onClick}>
        {isFavourite ? (
          <StarIcon style={{ fill: theme.palette.favourite }} />
        ) : (
          <StarBorderIcon style={{ fill: theme.palette.text.secondary }} />
        )}
      </Icon>
    </Box>
  );
};
