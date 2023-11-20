/* eslint-disable no-console */
// @ts-nocheck
import { NextService } from "@/service/NextService/NextService";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    NextService.emailSignUp({
      name: "",
      password: "123",
      session: "",
      email: "",
    })
      .then((res) => console.log({ res }))
      .catch((error) => console.log({ error }));
  }, []);
  return (
    <>
      <Head>
        <title>Cencoins</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>cencoins-client</h1>
      </main>
    </>
  );
}
