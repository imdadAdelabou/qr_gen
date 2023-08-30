import { APP_MESSAGE } from "../helpers/constants";
import style from "../style/logout.module.css";
import LogoutIcon from "../assets/logoutIcon.svg";
import { useContext } from "react";
import { UserContext } from "../views/stores/UserContext";
import { UserContextType, UserType } from "../helpers/types";

function Logout() {
  const { updateUser } = useContext(UserContext) as UserContextType;

  const logOut = () => {
    updateUser({ token: "", username: "", email: "", id: null });
  };

  return (
    <div className={style.main} onClick={logOut}>
      <img src={LogoutIcon} className={style.resizeIcon} />
      <h3 className={style.h3}>{APP_MESSAGE.logoutLabel}</h3>
    </div>
  );
}

export default Logout;
