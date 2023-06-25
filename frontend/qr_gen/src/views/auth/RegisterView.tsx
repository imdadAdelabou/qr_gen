import "../../style/login.css";
import qrCodeIllus1 from "../../assets/qrCode_ill1.svg";
import { APP_MESSAGE, LOGIN_PATH } from "../../helpers/constants";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSubmit from "../../hooks/useSubmit";

function RegisterView() {
  const navigate = useNavigate();
  const { isLoading, submit } = useSubmit();

  const navigateToLogin = () => navigate(LOGIN_PATH);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formik.handleSubmit(e);
  };

  // const register = (data: unknown) => {};

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      // submit("/api/register", values, register);
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3).required(),
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
                  placeholder: APP_MESSAGE.usernameLabel,
                  type: "text",
                  id: "username",
                  ...formik.getFieldProps("username"),
                }}
                haveError={
                  formik.touched && formik.errors.username ? true : false
                }
              />
              <div className="error__text">{formik.errors.username}</div>
              <div className="spacer"></div>
              <CustomInput
                props={{
                  placeholder: APP_MESSAGE.dummyMail,
                  type: "email",
                  ...formik.getFieldProps("email"),
                }}
                haveError={formik.touched && formik.errors.email ? true : false}
              />
              <div className="error__text">{formik.errors.email}</div>
              <div className="spacer"></div>
              <CustomInput
                props={{
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
                content={APP_MESSAGE.registerLabel}
                type="submit"
                isActive={
                  isLoading ||
                  formik.errors.email ||
                  formik.errors.password ||
                  formik.errors.username
                    ? false
                    : true
                }
                disabled={
                  isLoading ||
                  formik.errors.email ||
                  formik.errors.password ||
                  formik.errors.username
                    ? true
                    : false
                }
              ></CustomBtn>
            </div>
            <h3 className="new_user_link" onClick={navigateToLogin}>
              {APP_MESSAGE.alreadyHaveAnAccount}
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterView;
