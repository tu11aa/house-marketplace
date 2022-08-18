import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

const auth = getAuth();

const signUp = async (data) => {
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
    return userCredential.user;
  } catch (error) {
    throw new Error(error);
  }
};

const signIn = async (data) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error);
  }
};

export { signUp, signIn, auth };
