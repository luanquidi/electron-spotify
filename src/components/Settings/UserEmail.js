import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/firebase";
import "firebase/auth";
import { reauthenticate } from "../../utils/Api";

const UserEmail = ({
  user,
  setShowModal,
  setTitleModal,
  setContentModal,
  setReloadApp,
}) => {
  const [emailUser, setEmailUser] = useState(user.email);

  const onEdit = () => {
    setShowModal((p) => !p);
    setTitleModal("Editar correo");
    setContentModal(
      <ChangeEmailForm
        setShowModal={setShowModal}
        email={emailUser}
        setEmailUser={setEmailUser}
        setReloadApp={setReloadApp}
      />
    );
  };
  return (
    <div className="user-email">
      <h3>{emailUser}</h3>
      <Button
        circular
        animated="vertical"
        style={{ width: "100px" }}
        onClick={onEdit}
      >
        <Button.Content hidden>Actualizar</Button.Content>
        <Button.Content visible>
          <Icon name="edit" />
        </Button.Content>
      </Button>
    </div>
  );
};

function ChangeEmailForm({ email, setShowModal, setEmailUser, setReloadApp }) {
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      toast.warning("El correo es el mismo.");
      setShowModal(false);
      return;
    }

    if (!formData.password) {
      toast.warning("La contraseña es obligatoria.");
      return;
    }

    setIsLoading(true);

    reauthenticate(formData.password)
      .then((res) => {
        const currentUser = firebase.auth().currentUser;
        currentUser
          .updateEmail(formData.email)
          .then(() => {
            toast.success("El correo se ha actualizado.");
            setIsLoading(false);
            setShowModal(false);
            // setReloadApp(true);
            setEmailUser(formData.email);
            currentUser.sendEmailVerification().then(()=> {
                firebase.auth().signOut();
            })
          })
          .catch(() => {
            toast.warning("Error al tratar cambiar correo. ");
          });
      })
      .catch(() => {
        toast.error("Error al tratar cambiar correo.");
        setShowModal(false);
      });

    // firebase
    //   .auth()
    //   .currentUser.updateProfile({
    //     displayName: formData.displayName,
    //   })
    //   .then(() => {
    //     toast.success("¡Nombre actualizado!");
    //     setEmailUser(formData.email);
    //     setIsLoading(false);
    //     setShowModal(false);
    //     setReloadApp((prev) => !prev);
    //   })
    //   .catch(() => {
    //     toast.error("No se pudo actualizar el nombre.");
    //     setIsLoading(false);
    //   });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={email}
          icon="mail"
          iconPosition="left"
          placeholder="Correo"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          type="password"
          icon="lock"
          iconPosition="left"
          placeholder="Contraseña"
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
      </Form.Field>
      <span>
        <p>Contraseña actual para poder modificar el correo</p>
      </span>
      <Button type="submit" loading={isLoading}>
        Actualizar correo
      </Button>
    </Form>
  );
}

export default UserEmail;
