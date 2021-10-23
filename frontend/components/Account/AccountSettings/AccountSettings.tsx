import React, { useState } from "react";
import { stringToColor } from "../../Navbar/Navbar";
import styles from "./AccountSettings.module.css";
import Navigation from "./Navigation/Navigation";
import SettingsContent from "./SettingsContent/SettingsContent";

function AccountSettings() {
  const [newProfilePicture, setNewProfilePicture] = useState<string>("");
  const [itemChecked, setItemChecked] = useState<number>(0);

  const handleChangePictureFile = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setNewProfilePicture(URL.createObjectURL(event.target.files[0]));
      console.log(newProfilePicture);
    }
  };

  return (
    <div className={styles.container}>
      <Navigation itemChecked={itemChecked} setItemChecked={setItemChecked} />
      <SettingsContent
        itemChecked={itemChecked}
        setItemChecked={setItemChecked}
      />
    </div>
  );
}

export default AccountSettings;
