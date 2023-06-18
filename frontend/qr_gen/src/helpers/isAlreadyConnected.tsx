import { Navigate } from "react-router-dom";
import * as React from "react";
import { UserContext } from "../views/stores/UserContext";
import { UserContextType } from "./types";

function IsAlreadyConnected(children: JSX.Element) {
  const { user } = React.useContext(UserContext) as UserContextType;

  if (user?.token) {
    return <Navigate replace to="/" />;
  }
  return children;
}

export default IsAlreadyConnected;
