import Box from "@mui/material/Box";
import Container from "@/components/Container/Container";
import { Button, useTheme, Typography, Paper, Grid } from "@mui/material";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { getInitialServerSideProps } from "@/utils/getInitialServerSide";
import { DICTIONARY } from "@/constants/DICTIONARY";
import { LANGUAGES } from "@/constants/LANGUAGES";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Link from "next/link";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

interface Props {}

const CompanyPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>{t("О нас")}</title>
      </Head>
      <Container>
        <Box mb={6}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            {t("О нас")}
          </Typography>
          <Typography
            variant="body1"
            color={theme.palette.text.secondary}
            mb={2}
          >
            {t(
              "Наша команда – опытные специалисты в разработке высоконагруженных систем и проектировании инфраструктуры. Мы также успешно внедряем ландшафт для сбора статистических данных в критически важных информационных системах.",
            )}
          </Typography>
          <Typography variant="body1" color={theme.palette.text.secondary}>
            {t(
              "Наш коллектив также гордится опытом работы с многомиллионными продуктами, внедрением инноваций и продуктивным развитием. Мы привносим этот обширный опыт в CENCOINS, обеспечивая надежность и эффективность на каждом этапе развития.",
            )}
          </Typography>
        </Box>
        <Box mb={3}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            {t("Наши продукты")}
          </Typography>
          <Typography variant="body1" color={theme.palette.text.secondary}>
            {t(
              "Арбитражный сканер - обеспечивая точные и своевременные данные о различиях в ценах, наш сканер позволяет выстраивать стратегии арбитража с учетом волатильности. С мгновенными уведомлениями о выгодных сделках и автоматизированными инструментами анализа, Cencoins упрощает процесс принятия решений, открывая перед трейдерами мир новых финансовых возможностей.",
            )}
          </Typography>
        </Box>
        <Link href={"/"}>
          <Button endIcon={<ArrowRightAltIcon />}>{t("Подробнее")}</Button>
        </Link>
      </Container>
      <Box
        sx={{
          position: "relative",
          backgroundColor: theme.palette.alternate.main,
        }}
      >
        <Container py={8}>
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
            {t("Контакты")}
          </Typography>
          <Typography
            variant="body1"
            color={theme.palette.text.secondary}
            textAlign="center"
            mb={3}
          >
            {t(
              "Мы работаем без перерывов и выходных, чтобы предоставлять нашим пользователям лучший клиентский опыт и поддержку. Рекомендуем перед обращением изучить раздел часто задаваемых вопросов, где собраны основные ответы на популярные вопросы.",
            )}
          </Typography>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={40}
                    height={40}
                    borderRadius="50%"
                    sx={{ backgroundColor: theme.palette.secondary.dark }}
                  >
                    <PhoneIcon
                      style={{
                        color: theme.palette.grey.A100,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Telegram</Typography>
                  <Link
                    href="https://teleg.run/cencoins"
                    passHref
                    legacyBehavior
                  >
                    <Typography
                      component="a"
                      variant="body1"
                      color={theme.palette.text.secondary}
                    >
                      @cencoins
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={40}
                    height={40}
                    borderRadius="50%"
                    sx={{ backgroundColor: theme.palette.secondary.dark }}
                  >
                    <EmailIcon
                      style={{
                        color: theme.palette.grey.A100,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Email</Typography>
                  <Link href="mailto:info@cencoins.com" passHref legacyBehavior>
                    <Typography
                      component="a"
                      variant="body1"
                      color={theme.palette.text.secondary}
                    >
                      info@cencoins.com
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={40}
                    height={40}
                    borderRadius="50%"
                    sx={{ backgroundColor: theme.palette.secondary.dark }}
                  >
                    <FmdGoodIcon
                      style={{
                        color: theme.palette.grey.A100,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{t("Адрес")}</Typography>
                  <Typography
                    variant="body1"
                    color={theme.palette.text.secondary}
                  >
                    lane, 15, St. Petersburg, 191014
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container py={9}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4" fontWeight={700} mb={3}>
              {t("Не нашли нужную информацию?")}
            </Typography>
            <Typography variant="body1" color={theme.palette.text.secondary}>
              {t(
                "В разделе FAQ мы собрали обширную базу знаний для быстрого решения вопроса",
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Link href={"/faq"}>
              <Button endIcon={<ArrowRightAltIcon />} variant="contained">
                {t("Изучить")}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
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

export default CompanyPage;
