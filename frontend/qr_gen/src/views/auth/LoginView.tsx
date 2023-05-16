import "../../style/login.css";
import qrCodeIllus1 from "../../assets/qrCode_ill1.svg";
import { APP_MESSAGE } from "../../helpers/constants";

function LoginView() {
    return <div className="container row">
        <div className="col-7 second__part">
            <img src={qrCodeIllus1} className="second__part__resize_ill" />
            <h1 className="text-white second__part__resize_txt">{APP_MESSAGE.qrCodeIll1Msg}</h1>
        </div>
        <div className="col"></div>
    </div>
}

export default LoginView;