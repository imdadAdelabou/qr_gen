import "../../style/login.css";
import qrCodeIllus1 from "../../assets/qrCode_ill1.svg";
import { APP_MESSAGE, REGISTER_PATH } from "../../helpers/constants";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { redirect, useNavigate } from "react-router-dom";
import React, { FormEvent } from "react";
import { useFormik } from "formik";
import useSubmit from "../../hooks/useSubmit";
import * as Yup from "yup";
import openToast from "../../helpers/functions";
import { LoginType } from "../../helpers/types";

function LoginView() {
  const { isLoading, response, submit } = useSubmit();
  const navigate = useNavigate();

  const navToRegister = () => navigate(REGISTER_PATH);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    formik.handleSubmit(e);
  }

  function login(token: string) {
    console.log(token, "test");
    localStorage.setItem("userToken", token);

    redirect("/");
    return;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await submit("/api/login", values, (data) =>
        login((data as LoginType).user.token)
      );
      if (response) openToast(response.message, response.type);
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    }),
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-7 second__part">
          <img
            src={qrCodeIllus1}
            className="second__part__resize_ill centerChild"
          />
          <h1 className="text-white second__part__resize_txt centerChild">
            {APP_MESSAGE.qrCodeIll1Msg}
          </h1>
        </div>
        <div className="col centerC">
          <form method="POST" onSubmit={onSubmit}>
            <div className="body__form">
              <CustomInput
                props={{
                  id: "email",
                  placeholder: APP_MESSAGE.dummyMail,
                  ...formik.getFieldProps("email"),
                }}
                haveError={formik.touched && formik.errors.email ? true : false}
              />
              <div className="error__text">{formik.errors.email}</div>
              <div className="spacer"></div>
              <CustomInput
                props={{
                  id: "password",
                  placeholder: "*****",
                  type: "password",
                  ...formik.getFieldProps("password"),
                }}
                haveError={
                  formik.touched && formik.errors.password ? true : false
                }
              />
              <div className="error__text">{formik.errors.password}</div>
              <div className="spacer"></div>
              <CustomBtn
                content={APP_MESSAGE.loginLabel}
                isActive={
                  formik.errors.email || formik.errors.password || isLoading
                    ? false
                    : true
                }
                disabled={
                  formik.errors.email || formik.errors.password || isLoading
                    ? true
                    : false
                }
                isLoading={isLoading}
                type="submit"
              ></CustomBtn>
            </div>
            <h3 className="new_user_link" onClick={navToRegister}>
              {APP_MESSAGE.notAnAccount}
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
