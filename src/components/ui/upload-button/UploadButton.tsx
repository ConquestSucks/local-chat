import React from "react";
import styles from "./upload-button.module.css";
import CrosshairButton from "../crosshair-button/CrosshairButton";

const UploadButton = ({
  onChange ,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles["file-upload-container"]}>
      <label htmlFor="file-upload" className={styles["custom-file-upload"]}>
        <CrosshairButton variant="upload" />
      </label>
      <input id="file-upload" type="file" onChange={onChange} />
    </div>
  );
};

export default UploadButton;
