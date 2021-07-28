import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import client from "../../pages/api/apollo-client";
import { useQuery } from "@apollo/client";
import { UserInfo, GET_CURRENT_USER } from "../../pages/api/apollo-client";
import { useContainer } from "unstated-next";
import { useRouter } from "next/router";

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

function Navbar(props: any) {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const router = useRouter();

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowAccountMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const classes = useStyles();

  const currentUser = useQuery(GET_CURRENT_USER);
  const { isLogged, username, changeIsLogged, changeUsername } =
    useContainer(UserInfo);

  if (currentUser.data?.me) {
    changeIsLogged(true);
    changeUsername(currentUser.data?.me.username);
  } else {
    changeIsLogged(false);
    changeUsername("");
  }

  const handleSignOut = () => {
    client.resetStore();
    setShowAccountMenu(false);
    currentUser.refetch();
    changeIsLogged(false);
    changeUsername("");
    router.push({ pathname: "/signin" });
  };

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
            <button
              className={styles.btn2}
              onClick={() => setShowAccountMenu(true)}
            >
              <Avatar className={classes.purple}>{username[0]}</Avatar>
              {username}
            </button>
          </div>
        )}
      </div>
      {showAccountMenu && isLogged && (
        <div className={styles.accountmenu} ref={wrapperRef}>
          <div className={styles.arrowup} />
          <div className={styles.elements}>
            <Link href="/">
              <a onClick={() => setShowAccountMenu(false)}>My account</a>
            </Link>
            <Link href="/">
              <a onClick={() => setShowAccountMenu(false)}>Todos</a>
            </Link>
            <Link href="/">
              <a onClick={() => setShowAccountMenu(false)}>Settings</a>
            </Link>
            <Link href="/">
              <a onClick={handleSignOut}>Sign out</a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
