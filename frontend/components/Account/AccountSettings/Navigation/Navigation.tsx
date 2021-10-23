import React, { useState } from "react";
import styles from "./Navigation.module.css";

function Navigation(props: any) {
  const { itemChecked, setItemChecked } = props;

  const navigationButtons = [
    { id: 0, name: "General", path: "/" },
    { id: 1, name: "Privacy", path: "/" },
  ];

  return (
    <div className={styles.container}>
      <ul className={styles.btncontainer}>
        {navigationButtons.map((item) => {
          return (
            <li
              className={`${styles.element} ${
                itemChecked === item.id ? styles.elementChecked : null
              }`}
              key={item.id}
              onClick={() => {
                setItemChecked(item.id);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Navigation;
