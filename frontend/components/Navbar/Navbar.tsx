import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>NotesDir</div>
      <div className={styles.links}>
        <Link href="/">
          <a>Todo list</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </div>
      <div className={styles.account}>
        <Link href="/signup">
          <button className={styles.btn1}>Sign up</button>
        </Link>
        <button className={styles.btn1}>Sign in</button>
      </div>
    </header>
  );
}

export default Navbar;
