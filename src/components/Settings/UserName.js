import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/firebase";
import "firebase/auth";

const UserName = ({
  user,
  setShowModal,
  setTitleModal,
  setContentModal,
  setReloadApp,
}) => {
  const [nameUser, setNameUser] = useState(user.displayName);

  const onEdit = () => {
    setShowModal((p) => !p);
    setTitleModal("Editar nombre");
    setContentModal(
      <ChangeDisplayNameForm
        setShowModal={setShowModal}
        displayName={user.displayName}
        setNameUser={setNameUser}
        setReloadApp={setReloadApp}
      />
    );
  };

  return (
    <div className="user-name">
      <h2>{nameUser}</h2>
      <Button circular animated="vertical" style={{ width: "100px" }} onClick={onEdit}>
        <Button.Content hidden>Actualizar</Button.Content>
        <Button.Content visible>
          <Icon name="edit" />
        </Button.Content>
      </Button>
    </div>
  );
};

function ChangeDisplayNameForm({
  displayName,
  setShowModal,
  setNameUser,
  setReloadApp,
}) {
  const [formData, setFormData] = useState({ displayName: displayName });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.displayName || formData.displayName === displayName) {
      setShowModal(false);
      return;
    }

    setIsLoading(true);
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: formData.displayName,
      })
      .then(() => {
        toast.success("¡Nombre actualizado!");
        setNameUser(formData.displayName);
        setIsLoading(false);
        setShowModal(false);
        setReloadApp((prev) => !prev);
      })
      .catch(() => {
        toast.error("No se pudo actualizar el nombre.");
        setIsLoading(false);
      });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          icon="user"
          iconPosition="left"
          placeholder="Nombre"
          onChange={(e) =>
            setFormData({
              displayName: e.target.value,
            })
          }
        />
        <Button type="submit" loading={isLoading}>
          Actualizar nombre
        </Button>
      </Form.Field>
    </Form>
  );
}

export default UserName;
