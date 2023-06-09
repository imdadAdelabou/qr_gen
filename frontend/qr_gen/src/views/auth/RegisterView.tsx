import "../../style/login.css";
import qrCodeIllus1 from "../../assets/qrCode_ill1.svg";
import { APP_MESSAGE, LOGIN_PATH } from "../../helpers/constants";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { useNavigate } from "react-router-dom";

function RegisterView() {
  const navigate = useNavigate();

  const navigateToLogin = () => navigate(LOGIN_PATH);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-7 second__part">
          <img
            src={qrCodeIllus1}
            className="second__part__resize_ill centerChild"
          />
          <h1 className="text-white second__part__resize_txt centerChild">
            {APP_MESSAGE.qrCodeIll1Msg}
          </h1>
        </div>
        <div className="col centerC">
          <form>
            <div className="body__form">
              <CustomInput
                hintText={APP_MESSAGE.usernameLabel}
                typeInput="text"
              />
              <div className="spacer"></div>
              <CustomInput hintText={APP_MESSAGE.dummyMail} typeInput="email" />
              <div className="spacer"></div>
              <CustomInput hintText="*****" typeInput="password" />
              <div className="spacer"></div>
              <CustomBtn
                content={APP_MESSAGE.registerLabel}
                type="submit"
                isActive={true}
                action={() => {}}
              ></CustomBtn>
            </div>
            <h3 className="new_user_link" onClick={navigateToLogin}>
              {APP_MESSAGE.alreadyHaveAnAccount}
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterView;
