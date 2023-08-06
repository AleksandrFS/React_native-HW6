import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { authSignOut, updateUserInfo } from "./authSlice";

export const authReg =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { uid } = auth.currentUser;

      dispatch(
        updateUserInfo({
          userId: uid,
          login,
          email,
        })
      );
    } catch (error) {
      alert(`Register in failed: ${error.message}`);
    }
  };

export const authLog =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const { photoURL, uid, displayName } = auth.currentUser;
      dispatch(
        updateUserInfo({
          userId: uid,
          login: displayName,
          email,
          userImage: photoURL,
        })
      );
    } catch (error) {
      alert(`Sign in failed: ${error.message}`);
    }
  };

export const authStateChanged = (setUser) => {
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
};

export const authSingOut = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    alert(`Log out failed: ${error.message}`);
  }
};
