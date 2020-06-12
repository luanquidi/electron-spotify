import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import NoAvatar from "../../assets/png/user.png";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import firebase from "../../utils/firebase";
import "firebase/storage";
import "firebase/auth";

const UploadAvatar = ({ user, setReloadApp }) => {
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setAvatarUrl(URL.createObjectURL(file));
    uploadImage(file).then((res) => {
      updateUserAvatar();
    });
  });

  const uploadImage = (file) => {
    const ref = firebase.storage().ref().child(`avatar/${user.uid}`);
    return ref.put(file);
  };

  const updateUserAvatar = () => {
    firebase
      .storage()
      .ref(`avatar/${user.uid}`)
      .getDownloadURL()
      .then(async (res) => {
        await firebase.auth().currentUser.updateProfile({
          photoURL: res,
        });
        setReloadApp((prevState) => !prevState);
      })
      .catch(() => {
        toast.error("Error al actualizar avatar.");
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
};

export default UploadAvatar;
