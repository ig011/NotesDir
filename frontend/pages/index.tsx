import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/home/Home.module.css";

export default function Home() {
  return <div className={styles.container}>This is my homepage</div>;
}
