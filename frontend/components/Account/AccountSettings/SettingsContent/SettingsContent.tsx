import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { UserInfo } from "../../../../pages/api/apollo-client";
import styles from "./SettingsContent.module.css";

function SettingsContent(props: any) {
  const { itemChecked, setItemChecked } = props;

  const { isLogged, username, profilePicture, changeProfilePicture } =
    UserInfo.useContainer();

  const [newProfilePicture, setNewProfilePicture] = useState(profilePicture);
  const router = useRouter();

  const handleChoosePhoto = (event: any) => {
    console.log(URL.createObjectURL(event.target.files[0]));
    setNewProfilePicture(URL.createObjectURL(event.target.files[0]));
  };

  const handleSaveImage = () => {};

  useEffect(() => {
    if (!isLogged) {
      router.push("/signin");
    }
  }, []);

  return (
    <div className={styles.container}>
      {itemChecked === 0 ? (
        <div className={styles.content}>
          <div className={styles.profileInformations}>
            <label className={styles.contentTitle}>Profile picture</label>
            <div className={styles.informationsContainer}>
              <div className={styles.currentPhoto}>
                <div className={styles.pictureDiv}>
                  {newProfilePicture ? (
                    <img
                      src={newProfilePicture}
                      className={styles.profileImg}
                    />
                  ) : (
                    "None"
                  )}
                </div>
                <label className={styles.userLabel}>{username}</label>
              </div>
              <div className={styles.informations}>
                <div className={styles.infoElement}>
                  <label className={styles.textInfoElement}>First name</label>
                  <label className={styles.textInfoElement}>Value</label>
                </div>
                <div className={styles.infoElement}>
                  <label className={styles.textInfoElement}>Last name</label>
                  <label className={styles.textInfoElement}>Value</label>
                </div>
                <div className={styles.infoElement}>
                  <label className={styles.textInfoElement}>Date joined</label>
                  <label className={styles.textInfoElement}>Value</label>
                </div>
                <div className={styles.infoElement}>
                  <label htmlFor="filePicker" className={styles.btnInputFile}>
                    Choose photo
                  </label>
                  <input
                    className={styles.inputFile}
                    id="filePicker"
                    type="file"
                    accept="image/*"
                    onChange={handleChoosePhoto}
                  />
                  <label
                    className={`${styles.btnInputFile} ${styles.btnSend}`}
                    onClick={handleSaveImage}
                  >
                    SAVE IMAGE
                  </label>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SettingsContent;
