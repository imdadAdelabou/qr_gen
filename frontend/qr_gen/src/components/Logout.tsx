import { APP_MESSAGE } from "../helpers/constants";
import style from "../style/logout.module.css";
import LogoutIcon from "../assets/logoutIcon.svg";

function Logout() {
  return (
    <div className={style.main}>
      <img src={LogoutIcon} className={style.resizeIcon} />
      <h3 className={style.h3}>{APP_MESSAGE.logoutLabel}</h3>
    </div>
  );
}

export default Logout;
