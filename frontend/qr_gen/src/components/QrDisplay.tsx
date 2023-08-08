import { useState } from "react";
import { APP_MESSAGE } from "../helpers/constants";
import { QrType } from "../helpers/types";
import "../style/QrDisplay.css";
import CustomBtn from "./CustomBtn";
import { downloadQrCode } from "../helpers/functions";

function QrDisplay(qr: QrType) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(qr.url);
  const rightLabel = (type: string) => {
    switch (type) {
      case "link":
        return APP_MESSAGE.linkLabel;
      default:
        return APP_MESSAGE.contactCardQr;
    }
  };

  const action = async () => {
    setIsLoading(true);
    await downloadQrCode(qr.url, qr.typeQr);
    setIsLoading(false);
  };

  return (
    <div className="qr__card">
      <img src={qr.url} className="qr__img" />
      <h3 className="">{qr && qr.typeQr ? rightLabel(qr.typeQr) : ""}</h3>
      <span className="link">{`${APP_MESSAGE.generateToLabel} ${qr.date}}`}</span>
      <div className="spacer"></div>

      <CustomBtn
        isActive={!isLoading}
        isLoading={isLoading}
        content={APP_MESSAGE.downloadLabel}
        action={action}
      ></CustomBtn>
    </div>
  );
}

export default QrDisplay;
