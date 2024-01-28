import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Box, Divider } from "@mui/material";

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
  disabled?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Link href={props.href ?? ""} passHref legacyBehavior>
      <Tab component="a" aria-current={props.selected && "page"} {...props} />
    </Link>
  );
}

interface Props {
  initialTab?: number;
}

export const SettingsTabs: React.FC<Props> = ({ initialTab = 0 }) => {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState(() => initialTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (event.type !== "click" || event.type === "click") {
      setActiveTab(newValue);
    }
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleChange}>
        <LinkTab label={t("Монеты")} href="/account/settings/coins" />
        <LinkTab label={t("Биржи")} href="/account/settings/exchanges" />
        <LinkTab label={t("Депозит")} href="/account/settings/deposit" />
      </Tabs>
      <Box py={4.5}>
        <Divider />
      </Box>
    </Box>
  );
};
