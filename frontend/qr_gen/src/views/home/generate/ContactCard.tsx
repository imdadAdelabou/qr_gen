import CustomInput from "../../../components/CustomInput";
import { APP_MESSAGE } from "../../../helpers/constants";
import style from "../../../style/contactcard.module.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import CustomBtn from "../../../components/CustomBtn";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormEvent, useState } from "react";
import useSubmit from "../../../hooks/useSubmit";
import { QrType, QrTypeContact } from "../../../helpers/types";
import QrDisplay from "../../../components/QrDisplay";

function ContactCard() {
  const { isLoading, submit } = useSubmit();
  const [cellPhone, setCellPhone] = useState("");
  const [phoneIsTouched, setPhoneIsTouched] = useState(false);
  const [qrCode, setQrCode] = useState<null | QrType>(null);
  const handlePhoneInput = (value: string) => {
    setCellPhone(value);
    console.log(value);
  };

  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", email: "" },
    onSubmit: (values) => {
      submit(
        "/api/generate/qr/contact",
        { ...values, cellPhone: cellPhone },
        (data) => {
          console.log(data);

          const response = data as QrTypeContact;
          console.log(response.data.date, "Date =>>");
          console.log(response.data);
          setQrCode({ ...response.data });
        }
      );
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2).required(),
      lastName: Yup.string().min(2).required(),
      email: Yup.string().email(),
    }),
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit(event);
  };

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>{APP_MESSAGE.contactSectionHeader}</h1>
      <form className={style.formWidth} onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: 20 }}>
          <div>
            <label className={style.label}>{APP_MESSAGE.firstNameLabel}*</label>
            <CustomInput
              props={{
                placeholder: "John",
                type: "text",
                id: "firstName",
                ...formik.getFieldProps("firstName"),
              }}
              haveError={
                formik.touched && formik.errors.firstName ? true : false
              }
            />
          </div>
          <div>
            <label className={style.label}>{APP_MESSAGE.lastNameLabel}*</label>
            <CustomInput
              props={{
                placeholder: "Doe",
                type: "text",
                id: "lastName",
                ...formik.getFieldProps("lastName"),
              }}
              haveError={
                formik.touched && formik.errors.lastName ? true : false
              }
            />
          </div>
        </div>
        <div className={style.m20}></div>

        <div>
          <label className={style.label}>{APP_MESSAGE.phoneNumberLabel}*</label>
          <PhoneInput
            defaultCountry="FR"
            placeholder="000000"
            className="customInput"
            id="phone"
            onChange={handlePhoneInput}
            onFocus={() => {
              setPhoneIsTouched(true);
            }}
          />

          {phoneIsTouched && !cellPhone && (
            <div style={{ color: "red" }}>
              {APP_MESSAGE.phoneNumberRequired}
            </div>
          )}
        </div>
        <div className={style.m20}></div>

        <div>
          <label className={style.label}>{APP_MESSAGE.emailLabel}</label>
          <CustomInput
            haveError={formik.touched && formik.errors.email ? true : false}
            props={{
              placeholder: "johndoe@gmail.com",
              type: "email",
              id: "email",
              ...formik.getFieldProps("email"),
            }}
          />
        </div>

        <div className={style.m20}></div>

        <CustomBtn
          content={APP_MESSAGE.generateLabel}
          type="submit"
          isActive={
            formik.errors.firstName ||
            formik.errors.lastName ||
            !cellPhone ||
            formik.errors.email ||
            isLoading
              ? false
              : true
          }
          isLoading={isLoading}
          disabled={
            formik.errors.firstName ||
            formik.errors.lastName ||
            formik.errors.email ||
            isLoading ||
            !cellPhone
              ? true
              : false
          }
        />
      </form>
      <div className={style.m20}></div>
      {qrCode && (
        <div style={{ width: "30%" }}>
          <QrDisplay {...qrCode} />
        </div>
      )}
    </div>
  );
}

export default ContactCard;
