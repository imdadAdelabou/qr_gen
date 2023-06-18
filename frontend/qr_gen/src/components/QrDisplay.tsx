import { APP_MESSAGE } from "../helpers/constants";
import { QrType } from "../helpers/types";
import "../style/QrDisplay.css";
import CustomBtn from "./CustomBtn";

function QrDisplay(qr: QrType) {
  console.log(qr.url);
  const rightLabel = (type: string) => {
    switch (type) {
      case "link":
        return APP_MESSAGE.linkLabel;
      default:
        return APP_MESSAGE.contactCardQr;
    }
  };

  return (
    <div className="qr__card">
      <img src={qr.url} className="qr__img" />
      <h3 className="">{qr && qr.typeQr ? rightLabel(qr.typeQr) : ""}</h3>
      <span className="link">{qr.date.toString()}</span>
      <div className="spacer"></div>

      <CustomBtn
        isActive={true}
        content={APP_MESSAGE.downloadLabel}
      ></CustomBtn>
    </div>
  );
}

export default QrDisplay;
