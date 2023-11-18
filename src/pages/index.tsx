import Head from "next/head";
import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
        <form>
          <div>
            <input type="email" name="email" />
          </div>
          <div>
            <input type="password" name="password" />
          </div>
          <div>
            <button> submit </button>
          </div>
        </form>
      </main>
    </>
  );
}
