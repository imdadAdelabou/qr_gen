import { APP_MESSAGE } from "../helpers/constants";
import "../style/ErrorPage.css";

function DownloadError() {
  return (
    <div className="bg">
      <div className="resize">
        <h4>{APP_MESSAGE.downloadError}</h4>
      </div>
    </div>
  );
}

export default DownloadError;
