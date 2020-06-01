import firebaseApp from "./firebase";
import * as firebase from "firebase";

//base de datos firebase
const db = firebase.firestore(firebaseApp);

export async function isUserAdmin(uid) {

  const response = await db
    .collection("admins")
    .doc(uid)
    .get();

    return response.exists;

}
