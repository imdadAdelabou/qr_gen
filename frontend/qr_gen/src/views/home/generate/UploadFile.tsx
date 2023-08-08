import { useState } from "react";
import FileCmp from "../../../components/FileCmp";
import {
  APP_MESSAGE,
  BASE_PYTHON_BACKEND_URL,
  PATH_QR_LINK,
} from "../../../helpers/constants";
import CustomBtn from "../../../components/CustomBtn";
import "../../../style/FileCmp.css";
import QrDisplay from "../../../components/QrDisplay";
import {
  GenQrResponseType,
  QrType,
  ResponseOwType,
  TypeResponse,
} from "../../../helpers/types";
import axios from "axios";
import useSubmit from "../../../hooks/useSubmit";
import openToast from "../../../helpers/functions";

function UploadFile() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setCurrentFile] = useState<FileList | null>(null);
  const { submit } = useSubmit();
  const [qrCode, setQrCode] = useState<QrType | null>(null);
  const formData = new FormData();

  function getFile(value: FileList | null) {
    setCurrentFile(value);
  }

  async function action() {
    if (file) {
      setIsLoading(true);
      formData.append("file", file[0]);
      formData.append("name", "imdad");

      try {
        const result = await axios.post(
          `${BASE_PYTHON_BACKEND_URL}/file`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const ownCloud = result.data as ResponseOwType;
        submit(PATH_QR_LINK, { link: ownCloud.url }, (data: unknown) => {
          const encs = data as GenQrResponseType;
          const result: QrType = encs.data;
          console.log(ownCloud.url);
          setQrCode(result);
        });
      } catch (e) {
        openToast(APP_MESSAGE.internalServorError, TypeResponse.ERROR);
      }
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>{APP_MESSAGE.fileSectionHeader}</h1>
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

        {qrCode && (
          <div style={{ width: "30%" }}>
            <QrDisplay {...qrCode} />{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadFile;
