import React, { useState } from "react";

// Components
import UploadAvatar from "../../components/Settings/UploadAvatar";
import UserName from "../../components/Settings/UserName";
import BasicModal from "../../components/Modal/BasicModal/BasicModal";

// Styles
import "./Settings.scss";
import UserEmail from "../../components/Settings/UserEmail";
const Settings = ({ user, setReloadApp }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);
  return (
    <div className="settings">
      <h1>Configuración</h1>
      <div className="settings__avatar-name">
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <UserName
          user={user}
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
          setReloadApp={setReloadApp}
        />
      </div>
      <div className="settings__email">
        <UserEmail
          user={user}
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
          setReloadApp={setReloadApp}
        />
      </div>
      <BasicModal
        setShow={setShowModal}
        show={showModal}
        title={titleModal}
        children={contentModal}
      />
    </div>
  );
};

export default Settings;
