import Spinner from "../../components/Spinner";
import { APP_MESSAGE } from "../../helpers/constants";
import "../../style/VerificationEmail.css";

function VerificationEmail() {
  return (
    <div className="verify__email">
      <div>
        <Spinner />
        <h3 className="text__style">{APP_MESSAGE.verifyEmail}</h3>
      </div>
    </div>
  );
}

export default VerificationEmail;
