import { Navigate } from "react-router-dom";
import { LOGIN_PATH } from "./constants";
import * as React from "react";
import { UserContext } from "../views/stores/UserContext";
import { UserContextType } from "./types";

function RequiredAuth(children: JSX.Element) {
  const { user } = React.useContext(UserContext) as UserContextType;

  if (!user?.token) {
    return <Navigate replace to={LOGIN_PATH} />;
  }
  return children;
}

export default RequiredAuth;
