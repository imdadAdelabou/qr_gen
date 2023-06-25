import { useRef, useState } from "react";
import FileCmp from "../../../components/FileCmp";
import { APP_MESSAGE } from "../../../helpers/constants";
import CustomBtn from "../../../components/CustomBtn";
import "../../../style/FileCmp.css";
import QrDisplay from "../../../components/QrDisplay";
import { TypeQr } from "../../../helpers/types";

function UploadFile() {
  const [file, setCurrentFile] = useState<FileList | null>();

  function getFile(value: FileList | null) {
    setCurrentFile(value);
  }

  return (
    <div>
      <h1>{APP_MESSAGE.fileSectionHeader}</h1>
      <FileCmp getFile={getFile} />
      <div className="child3">
        <h3 className="text">
          {file && file?.length > 0 ? file[0].name : APP_MESSAGE.noFileSelected}
        </h3>
        <CustomBtn
          isActive={true}
          content={APP_MESSAGE.generateLabel}
        ></CustomBtn>
        <QrDisplay
          url="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png"
          date={new Date()}
          typeQr={TypeQr.Link}
        ></QrDisplay>
      </div>
    </div>
  );
}

export default UploadFile;
