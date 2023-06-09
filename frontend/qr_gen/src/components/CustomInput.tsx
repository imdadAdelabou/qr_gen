import { InputType } from "../helpers/types";
import "../style/login.css";

function CustomInput(props: InputType) {
  return (
    <>
      <input
        className={`customInput ${props.haveError ? "error_input" : ""}`}
        {...props.props}
      />
    </>
  );
}

export default CustomInput;
