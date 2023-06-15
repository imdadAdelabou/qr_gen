import { Navigate } from "react-router-dom";
import { useUser } from "../views/stores/UserContext";

function IsAlreadyConnected(children: JSX.Element) {
  const user = useUser()?.user;
  const token = user?.token;

  if (token) {
    return <Navigate replace to="/" />;
  }
  return children;
}

export default IsAlreadyConnected;
