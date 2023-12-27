import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { ILogin, IRegistration } from "../features/side-menu/form.interfaces";

const registrate = async (form: IRegistration): Promise<object> => {
  const auth = getAuth();

  const response = await createUserWithEmailAndPassword(
    auth,
    form.email,
    form.password
  );

  return response;
};

const login = async (form: ILogin): Promise<object> => {
  const auth = getAuth();

  const response = await signInWithEmailAndPassword(
    auth,
    form.email,
    form.password
  );

  return response;
};

const logout = async (): Promise<void> => {
  const auth = getAuth();

  await signOut(auth);
};

export default {
  registrate,
  login,
  logout,
};
