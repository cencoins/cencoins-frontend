import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@/components/Container/Container";
import { useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { getInitialServerSideProps } from "@/utils/getInitialServerSide";
import { DICTIONARY } from "@/constants/DICTIONARY";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Head from "next/head";

const mock = [
  {
    title: "Starter",
    subtitle: "Базовый тариф подходит новичкам",
    price: { monthly: "$22", year: "$190" },
    features: [
      { title: "{{value}} криптовалют", value: 20 },
      { title: "{{value}} CEX бирж", value: 10 },
    ],
    isHighlighted: false,
  },
  {
    title: "Pro",
    subtitle: "Подходит опытным",
    price: { monthly: "$44", year: "$390" },
    features: [
      { title: "{{value}} криптовалют", value: 100 },
      { title: "{{value}} CEX бирж", value: 20 },
      { title: "{{value}} DEX бирж", value: 5 },
    ],
    isHighlighted: true,
  },
  {
    title: "Enterprise",
    subtitle: "Прекрасно подойдет профессионалам",
    price: { monthly: "$77", year: "$690" },
    features: [
      { title: "{{value}} криптовалют", value: 250 },
      { title: "{{value}} CEX бирж", value: 50 },
      { title: "{{value}} DEX бирж", value: 25 },
      { title: "Premium поддержка" },
    ],
    isHighlighted: false,
  },
];

interface Props {}

interface FaqGroupItemProps {
  title?: string;
  items: Array<{
    title: string;
    subtitle: string;
  }>;
}

const FaqGroupItem = ({ title, items }: FaqGroupItemProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Box>
      {title && (
        <Box marginBottom={2}>
          <Typography fontWeight={700} variant={"h5"}>
            {title}
          </Typography>
        </Box>
      )}
      <Box>
        {items.map((item, i) => (
          <Box
            component={Accordion}
            defaultExpanded={i === 0}
            key={i}
            padding={1}
            marginBottom={2}
            borderRadius={`${theme.spacing(1)} !important`}
            sx={{
              "&::before": {
                display: "none",
              },
            }}
          >
            <Box
              component={AccordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`panel1a-header--${i}`}
            >
              <Typography fontWeight={600}>{item.title}</Typography>
            </Box>
            <AccordionDetails>
              <Typography color="text.secondary">{item.subtitle}</Typography>
            </AccordionDetails>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const TariffsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const [pricingOption, setPricingOption] = useState("year");

  const handleClick = (_: unknown, newPricingOption: string) => {
    setPricingOption(newPricingOption);
  };

  const renderToggler = () => (
    <Box display={"flex"} justifyContent={"center"} marginBottom={4}>
      <ToggleButtonGroup value={pricingOption} exclusive onChange={handleClick}>
        <ToggleButton
          value="year"
          size={isMd ? "large" : "small"}
          sx={{
            minWidth: "78px",
            backgroundColor:
              pricingOption === "year"
                ? `${theme.palette.primary.light} !important`
                : "transparent",
            border: `1px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: pricingOption === "year" ? "common.white" : "text.primary",
            }}
          >
            {t("Год")}
          </Typography>
        </ToggleButton>
        <ToggleButton
          value="monthly"
          size={isMd ? "large" : "small"}
          sx={{
            minWidth: "78px",
            backgroundColor:
              pricingOption === "monthly"
                ? `${theme.palette.primary.light} !important`
                : "transparent",
            border: `1px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: pricingOption !== "year" ? "common.white" : "text.primary",
            }}
          >
            {t("Месяц")}
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );

  return (
    <>
      <Head>
        <title>{t("Тарифы")}</title>
      </Head>
      <Box>
        <Box
          sx={{
            position: "relative",
            backgroundColor: theme.palette.alternate.main,
            marginTop: -13,
            paddingTop: 13,
          }}
        >
          <Container position={"relative"} zIndex={3}>
            <Box margin="0 auto" maxWidth={1024}>
              <Box marginBottom={4}>
                <Typography
                  variant="h3"
                  gutterBottom
                  align={"center"}
                  sx={{
                    fontWeight: 900,
                  }}
                >
                  {t("Выберите тариф")}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.primary"
                  align={"center"}
                >
                  {t(
                    "Независимо от вашего уровня - новичка или опытного профессионала. Изучите наши выгодные тарифы и выберите идеальную подписку, соответствующую вашим целям.",
                  )}
                </Typography>
              </Box>
              {renderToggler()}
            </Box>
          </Container>
        </Box>
        <Container>
          <Grid container spacing={4} mb={9.5}>
            {mock.map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Box
                  component={Card}
                  height={1}
                  display={"flex"}
                  flexDirection={"column"}
                  variant={"outlined"}
                >
                  <CardContent
                    sx={{
                      padding: 4,
                    }}
                  >
                    <Box marginBottom={2}>
                      <Typography variant={"h4"} fontWeight={600} gutterBottom>
                        {t(item.title)}
                      </Typography>
                      <Typography color={"text.secondary"}>
                        {t(item.subtitle)}
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      alignItems={"baseline"}
                      marginBottom={2}
                    >
                      <Typography variant={"h3"} fontWeight={700}>
                        {pricingOption === "year"
                          ? item.price.year
                          : item.price.monthly}
                      </Typography>
                      <Typography
                        variant={"subtitle1"}
                        color={"text.secondary"}
                        fontWeight={700}
                      >
                        {pricingOption === "year" ? "/y" : "/mo"}
                      </Typography>
                    </Box>
                    <Grid container spacing={1}>
                      {item.features.map((feature, j) => (
                        <Grid item xs={12} key={j}>
                          <Box
                            component={ListItem}
                            disableGutters
                            width={"auto"}
                            padding={0}
                          >
                            <Box
                              component={ListItemAvatar}
                              minWidth={"auto !important"}
                              marginRight={2}
                            >
                              <Box
                                component={Avatar}
                                bgcolor={theme.palette.primary.main}
                                width={20}
                                height={20}
                              >
                                <svg
                                  width={12}
                                  height={12}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Box>
                            </Box>
                            <ListItemText
                              primary={t(feature.title, {
                                value: feature?.value,
                              })}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                  <Box flexGrow={1} />
                  <CardActions sx={{ justifyContent: "flex-end", padding: 4 }}>
                    <Button size={"large"} variant={"contained"}>
                      {t("Купить")}
                    </Button>
                  </CardActions>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box maxWidth={768} margin="0 auto">
            <Box marginBottom={6}>
              <FaqGroupItem
                title={"FAQ"}
                items={[
                  {
                    title: t("Могу ли я оплатить подписку криптовалютой?"),
                    subtitle: t(
                      "Да, мы поддерживаем оплату наиболее популярными криптовалютами",
                    ),
                  },
                  {
                    title: "What is your return policy?",
                    subtitle:
                      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
                  },
                  {
                    title: "Do you sell gift cards?",
                    subtitle:
                      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
                  },
                  {
                    title: "Can I change plans later on?",
                    subtitle:
                      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
                  },
                  {
                    title: "Is this a subscription service?",
                    subtitle:
                      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
                  },
                ]}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  return {
    props: {
      ...(await getInitialServerSideProps(context)),
      ...(await serverSideTranslations(context.locale ?? LANGUAGES.RU, [
        DICTIONARY.COMMON,
      ])),
    },
  };
};

export default TariffsPage;
