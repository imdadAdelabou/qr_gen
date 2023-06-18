import { useFormik } from "formik";
import CustomBtn from "../../../components/CustomBtn";
import CustomInput from "../../../components/CustomInput";
import { APP_MESSAGE, PATH_QR_LINK } from "../../../helpers/constants";
import "../../../style/Link.css";
import * as Yup from "yup";
import { FormEvent, useState } from "react";
import useSubmit from "../../../hooks/useSubmit";
import QrDisplay from "../../../components/QrDisplay";
import { GenQrResponseType, QrType } from "../../../helpers/types";

function Link() {
  const { isLoading, submit } = useSubmit();
  const [qr, setQr] = useState<QrType | null>(null);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formik.handleSubmit(e);
  };

  const formik = useFormik({
    initialValues: { link: "" },
    onSubmit: async (values) => {
      submit(PATH_QR_LINK, values, (data) => {
        const encs = data as GenQrResponseType;
        const result: QrType = encs.data;
        formik.setFieldValue("link", "");

        setQr(result);
      });
    },
    validationSchema: Yup.object({
      link: Yup.string().url().required(),
    }),
  });

  return (
    <div className="link__card">
      <form method="POST" onSubmit={onSubmit}>
        <CustomInput
          props={{
            placeholder: APP_MESSAGE.enterYourLink,
            id: "link",

            ...formik.getFieldProps("link"),
          }}
          haveError={formik.touched && formik.errors.link ? true : false}
        ></CustomInput>
        <div className="spacer"></div>
        <CustomBtn
          content={APP_MESSAGE.generateLabel}
          isLoading={isLoading}
          disabled={formik.errors.link || isLoading ? true : false}
          isActive={formik.errors.link || isLoading ? false : true}
          type="submit"
        ></CustomBtn>
      </form>
      <div className="spacer"></div>

      {qr && <QrDisplay {...qr}></QrDisplay>}
    </div>
  );
}

export default Link;
