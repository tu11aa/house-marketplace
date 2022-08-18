import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

const signUp = async (data) => {
  const auth = getAuth();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  try {
    const user = userCredential.user;

    updateProfile(auth.currentUser, {
      displayName: data.name,
    });

    const dataCopy = { ...data };
    delete dataCopy.password;
    dataCopy.timestamp = serverTimestamp();
    await setDoc(doc(db, "users", user.uid), dataCopy);
  } catch (error) {
    throw new Error(error);
  }
};

export { signUp };
