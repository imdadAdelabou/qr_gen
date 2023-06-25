import { useRef, useState } from "react";
import FileCmp from "../../../components/FileCmp";
import { APP_MESSAGE } from "../../../helpers/constants";
import CustomBtn from "../../../components/CustomBtn";
import "../../../style/FileCmp.css";
import QrDisplay from "../../../components/QrDisplay";
import { TypeQr } from "../../../helpers/types";
import axios from "axios";

function UploadFile() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setCurrentFile] = useState<FileList | null>();
  const formData = new FormData();

  function getFile(value: FileList | null) {
    setCurrentFile(value);
  }

  async function action() {
    if (file) {
      setIsLoading(true);
      formData.append("file", file[0]);
      try {
        const result = await axios.post(
          "http://192.168.43.201:5000/file",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("Result ==> ", result);
      } catch (e) {
        console.log("Error =>> ", e);
      }
      setIsLoading(false);
    }
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
          isLoading={isLoading}
          isActive={!isLoading}
          content={APP_MESSAGE.generateLabel}
          action={action}
        ></CustomBtn>
      </div>
    </div>
  );
}

export default UploadFile;
