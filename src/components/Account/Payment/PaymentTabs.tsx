import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Button, Grid } from "@mui/material";

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

export const PaymentTabs: React.FC<Props> = ({ initialTab = 0 }) => {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState(() => initialTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (event.type !== "click" || event.type === "click") {
      setActiveTab(newValue);
    }
  };

  return (
    <Grid container justifyContent="space-between" mb={3}>
      <Grid item>
        <Tabs value={activeTab} onChange={handleChange}>
          <LinkTab
            label={t("История подписок")}
            href="/account/payment/history"
          />
          <LinkTab
            label={t("Платежная информация")}
            href="/account/payment/info"
          />
        </Tabs>
      </Grid>
      <Grid item>
        <Link href="/tariffs">
          <Button variant="outlined">{t("Тарифы")}</Button>
        </Link>
      </Grid>
    </Grid>
  );
};
