import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import { ServicePeriods } from "@/service/ServicePeriods/ServicePeriods";
import { allSettled, fork, serialize } from "effector";
import { setDataTarrifs } from "@/stores/tariffs.effector";
import { ServiceTariffs } from "@/service/ServiceTariffs/ServiceTariffs";
import { EffectorNext } from "@effector/next";
import { TariffsToggler } from "@/components/Tariffs/TariffsToggler";
import { TariffsItems } from "@/components/Tariffs/TariffsItems";

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

interface Props {
  values: Record<string, unknown>;
}

const TariffsPage = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();

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
              <EffectorNext values={props.values}>
                <TariffsToggler />
              </EffectorNext>
            </Box>
          </Container>
        </Box>
        <Container>
          <EffectorNext values={props.values}>
            <TariffsItems />
          </EffectorNext>
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
  // @ts-ignore
  let response = null;
  const responsePeriods = await ServicePeriods.getPeriods({
    headers: {
      "x-accept-language": context.locale,
    },
  });

  if (responsePeriods.data) {
    try {
      const allTariffs = Promise.all(
        responsePeriods.data.map((period) => {
          return ServiceTariffs.getTariffsByPeriod(
            {
              id: period.id,
            },
            {
              headers: {
                "x-accept-language": context.locale,
              },
            },
          );
        }),
      );
      response = await allTariffs;
    } catch (error) {}
  }

  const scope = fork();

  if (response) {
    await allSettled(setDataTarrifs, {
      scope,
      params: {
        selectedPeriod: responsePeriods.data[0].contents[0].text,
        periods: responsePeriods.data.map((period, index) => ({
          ...period,
          // @ts-ignore
          tariffs: response[index].data.reverse(),
        })),
      },
    });
  }

  return {
    props: {
      values: serialize(scope),
      ...(await getInitialServerSideProps(context)),
      ...(await serverSideTranslations(context.locale ?? LANGUAGES.RU, [
        DICTIONARY.COMMON,
      ])),
    },
  };
};

export default TariffsPage;
