import "../../style/login.css";
import qrCodeIllus1 from "../../assets/qrCode_ill1.svg";
import { APP_MESSAGE, REGISTER_PATH } from "../../helpers/constants";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function LoginView() {
  const navigate = useNavigate();

  const navToRegister = () => navigate(REGISTER_PATH);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("Okay");
    console.log({ ...formik.getFieldProps("email") });
    console.log(formik.errors.email);
    console.log(formik.errors.password);
    formik.handleSubmit(e);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      alert("Top");
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
              <div className="spacer"></div>
              <CustomBtn
                content={APP_MESSAGE.loginLabel}
                isActive={true}
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
