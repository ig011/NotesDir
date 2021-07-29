import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import {
  client,
  UserInfo,
  GET_CURRENT_USER,
} from "../../pages/api/apollo-client";
import { useContainer } from "unstated-next";
import Link from "next/link";
import { useRouter } from "next/router";
import AccountMenu from "./AccountMenu/AccountMenu";

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
  const classes = useStyles();

  const { isLogged, username, changeIsLogged, changeUsername } =
    useContainer(UserInfo);

  const getCurrentUser = async () => {
    await client
      .query({ query: GET_CURRENT_USER })
      .then((response) => {
        if (response.data?.me?.username) {
          changeIsLogged(true);
          changeUsername(response.data?.me.username);
        } else {
          changeIsLogged(false);
          changeUsername("");
        }
      })
      .catch();
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const navElements = [
    {
      name: "Todo list",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const navButtons = [
    {
      name: "Sign up",
      path: "/signup",
    },
    {
      name: "Sign in",
      path: "/signin",
    },
  ];

  return (
    <header className={styles.container}>
      <div className={styles.logo}>NotesDir</div>
      <div className={styles.links}>
        {navElements.map((elem) => {
          return (
            <Link href={elem.path}>
              <a>{elem.name}</a>
            </Link>
          );
        })}
      </div>
      <div className={styles.account}>
        {!isLogged ? (
          <>
            {navButtons.map((elem) => {
              return (
                <Link href={elem.path}>
                  <button className={styles.btn1}>{elem.name}</button>
                </Link>
              );
            })}
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
        <AccountMenu setShowAccountMenu={setShowAccountMenu} />
      )}
    </header>
  );
}

export default Navbar;
