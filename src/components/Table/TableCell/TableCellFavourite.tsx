import { IconButton, useTheme } from "@mui/material";
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
    <IconButton
      onClick={onClick}
      style={{
        cursor: "pointer",
      }}
    >
      {isFavourite ? (
        <StarIcon style={{ fill: theme.palette.favourite }} />
      ) : (
        <StarBorderIcon style={{ fill: theme.palette.text.secondary }} />
      )}
    </IconButton>
  );
};
