import React, { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  })
);

function Navbar() {
  const [isLogged, setIsLogged] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const classes = useStyles();

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
        {!isLogged ? (
          <>
            <Link href="/signup">
              <button className={styles.btn1}>Sign up</button>
            </Link>
            <Link href="/signin">
              <button className={styles.btn1}>Sign in</button>
            </Link>
          </>
        ) : (
          <div className={classes.root}>
            <Avatar className={classes.purple}>U</Avatar>
            <button
              className={styles.btn2}
              onMouseEnter={() => setShowAccountMenu(true)}
              onMouseLeave={() => setShowAccountMenu(false)}
            >
              account -
            </button>
          </div>
        )}
      </div>
      {showAccountMenu && (<div className={styles.accountmenucontainer}>
        <div className={styles.element}>
          <Link href="/">
            <a>My account</a>
          </Link>
          <Link href="/">
            <a>Todos</a>
          </Link>
          <Link href="/">
            <a>Settings</a>
          </Link>
          <Link href="/">
            <a>Sign out</a>
          </Link>
        </div>
      </div>}
    </header>
  );
}

export default Navbar;
