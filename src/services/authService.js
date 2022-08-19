import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
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

const signOut = () => {
  auth.signOut();
};

const updateUser = async (name) => {
  if (auth.currentUser.displayName !== name) {
    // Update display name in fb
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    // Update in firestore
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      name,
    });
  }
};

const _getAuth = () => {
  return { ...auth };
};

export { signUp, signIn, signOut, _getAuth, updateUser };
