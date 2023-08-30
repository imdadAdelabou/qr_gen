import { APP_MESSAGE } from "../helpers/constants";
import style from "../style/logout.module.css";
import LogoutIcon from "../assets/logoutIcon.svg";
import { LogOutType } from "../helpers/types";

function Logout(props: LogOutType) {
  return (
    <div className={style.main} onClick={props.action}>
      <img src={LogoutIcon} className={style.resizeIcon} />
      <h3 className={style.h3}>{APP_MESSAGE.logoutLabel}</h3>
    </div>
  );
}

export default Logout;
