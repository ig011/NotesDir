import React, { useState } from "react";
import { stringToColor } from "../../Navbar/Navbar";
import styles from "./AccountSettings.module.css";

function AccountSettings() {
  const [newProfilePicture, setNewProfilePicture] = useState<string>("");

  const handleChangePictureFile = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setNewProfilePicture(URL.createObjectURL(event.target.files[0]));
      console.log(newProfilePicture);
    }
  };

  return <div className={styles.container}>Settings!</div>;
}

export default AccountSettings;
