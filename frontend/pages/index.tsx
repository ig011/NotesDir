import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/home/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NotesDir</title>
        <meta name="description" content="NotesDir WebApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
