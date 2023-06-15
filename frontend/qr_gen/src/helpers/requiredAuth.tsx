import { Navigate } from "react-router-dom";
import { LOGIN_PATH } from "./constants";

function RequiredAuth(children: JSX.Element) {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return <Navigate replace to={LOGIN_PATH} />;
  }
  return children;
}

export default RequiredAuth;
