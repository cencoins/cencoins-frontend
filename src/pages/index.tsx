/* eslint-disable no-console */
import Container from "@/components/Container/Container";
import { Box } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // const email = "test123@gmail.com";
    // const password = "test123Qazwsx";
    // NextService.emailSignUpValidate({
    //   email: "zolotukhinwebp1r@gmail.com",
    // })
    //   .then((res) => {
    //     console.log({ res });
    //     NextService.emailSignUp({
    //       name: "Anatoliy",
    //       email,
    //       password,
    //       session: res.data.session,
    //     })
    //       .then((res2) => {
    //         console.log({ res2 });
    //         NextService.emailSignIn({
    //           email,
    //           password,
    //         })
    //           .then((res3) => {
    //             console.log({ res3 });
    //           })
    //           .catch((error3) => console.log({ error3 }));
    //       })
    //       .catch((error322) => console.log({ error322 }));
    //   })
    //   .catch((error2) => console.log({ error2 }));
  }, []);
  return (
    <>
      <Head>
        <title>Cencoins</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Box height={1500}>
          <h1>cencoins-client</h1>
        </Box>
      </Container>
    </>
  );
}
