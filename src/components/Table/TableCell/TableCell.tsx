import { PropsWithChildren } from "react";
import { useTranslation } from "next-i18next";
import { Box, BoxProps } from "@mui/material";

interface Props extends BoxProps {
  textAlign?: "left" | "right" | "center";
  color?: string;
}

export const TableCell: React.FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  const { t } = useTranslation();
  return <Box {...props}>{t(String(children))}</Box>;
};
