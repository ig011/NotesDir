import Head from "next/head";
import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar";
import client from "./api/apollo-client";
import { UserInfo } from "./api/apollo-client";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserInfo.Provider>
        <div className="container">
          <Head>
            <title>NotesDir</title>
            <meta name="description" content="NotesDir WebApp" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
          <Component {...pageProps} />
          {/* <Footer /> */}
        </div>
      </UserInfo.Provider>
    </ApolloProvider>
  );
}
export default MyApp;
