import { PropsWithChildren } from "react";
import { useTranslation } from "next-i18next";
import { Box } from "@mui/material";

interface Props {
  textAlign?: "left" | "right" | "center";
}

export const TableCell: React.FC<PropsWithChildren<Props>> = ({
  children,
  textAlign,
}) => {
  const { t } = useTranslation();
  return <Box textAlign={textAlign}>{t(String(children))}</Box>;
};
