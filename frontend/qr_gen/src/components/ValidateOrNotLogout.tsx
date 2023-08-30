import { APP_MESSAGE } from "../helpers/constants";
import { ValidateOrNotLogoutType } from "../helpers/types";
import CustomBtn from "./CustomBtn";

function ValidateOrNotLogout(props: ValidateOrNotLogoutType) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
      <CustomBtn
        isActive={false}
        content={APP_MESSAGE.cancelLabel}
        action={props.cancelAction}
      ></CustomBtn>
      <CustomBtn
        isActive={true}
        content={APP_MESSAGE.logOutLabel}
        action={props.logout}
        style={{ backgroundColor: "red" }}
      ></CustomBtn>
    </div>
  );
}

export default ValidateOrNotLogout;
