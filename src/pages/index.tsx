/* eslint-disable no-console */
import Container from "@/components/Container/Container";
import { Box } from "@mui/material";
import Head from "next/head";

export default function Home() {
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
