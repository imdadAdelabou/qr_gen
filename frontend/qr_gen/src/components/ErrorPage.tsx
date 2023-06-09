import { APP_MESSAGE } from "../helpers/constants";
import "../style/ErrorPage.css";

function ErrorPage() {
  return (
    <div className="bg">
      <div>
        <h1>{APP_MESSAGE.oopsLabel}</h1>
        <h4>{APP_MESSAGE.notFoundLabel}</h4>
      </div>
    </div>
  );
}

export default ErrorPage;
