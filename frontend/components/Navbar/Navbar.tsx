import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Avatar from "@material-ui/core/Avatar";
import {
  client,
  UserInfo,
  GET_CURRENT_USER,
} from "../../pages/api/apollo-client";
import Link from "next/link";
import AccountMenu from "./AccountMenu/AccountMenu";
import MenuOutlined from "@material-ui/icons/MenuOutlined";
import CancelOutlined from "@material-ui/icons/CancelOutlined";
import { IconButton } from "@material-ui/core";

function Navbar(props: any) {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNavbarMenu, setShowNavbarMenu] = useState(false);

  const {
    isLogged,
    username,
    profilePicture,
    changeIsLogged,
    changeUsername,
    changeIsStaff,
    changeProfilePicture,
  } = UserInfo.useContainer();

  const getCurrentUser = async () => {
    await client
      .query({ query: GET_CURRENT_USER })
      .then((response) => {
        if (response.data?.me?.username) {
          changeIsLogged(true);
          changeUsername(response.data?.me.username);
          changeIsStaff(response.data?.me.isStaff);
          if (response.data?.me?.userinformationSet[0]?.profilePicture) {
            changeProfilePicture(
              response.data.me.userinformationSet[0].profilePicture
            );
          } else changeProfilePicture("");
        } else {
          changeIsLogged(false);
          changeUsername("");
          changeIsStaff(false);
          changeProfilePicture("");
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
      <div
        className={`${styles.links} ${
          showNavbarMenu ? styles.linksactive : null
        }`}
      >
        {navElements.map((elem) => {
          return (
            <Link href={elem.path}>
              <a onClick={() => setShowNavbarMenu(false)}>{elem.name}</a>
            </Link>
          );
        })}
      </div>
      <div className={styles.account}>
        {!isLogged ? (
          <div className={styles.signbuttons}>
            {navButtons.map((elem) => {
              return (
                <Link href={elem.path}>
                  <button className={styles.btn1}>{elem.name}</button>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>
            <button
              className={styles.btn2}
              onClick={() => setShowAccountMenu(true)}
            >
              <Avatar
                className={styles.avatar}
                src={profilePicture ? profilePicture : ""}
              >
                {username[0]}
              </Avatar>
              {username}
            </button>
          </div>
        )}
        <div className={styles.menubutton}>
          <IconButton aria-label="delete" size="small">
            {!showNavbarMenu ? (
              <MenuOutlined
                fontSize="large"
                style={{ fill: "white" }}
                onClick={() => setShowNavbarMenu(true)}
              />
            ) : (
              <CancelOutlined
                fontSize="large"
                style={{ fill: "white" }}
                onClick={() => setShowNavbarMenu(false)}
              />
            )}
          </IconButton>
        </div>
      </div>
      {showAccountMenu && isLogged && (
        <AccountMenu setShowAccountMenu={setShowAccountMenu} />
      )}
    </header>
  );
}

export default Navbar;
