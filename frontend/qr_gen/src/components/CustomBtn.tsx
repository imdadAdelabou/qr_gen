import { BtnType } from "../helpers/types";
import "../style/CustomBtn.css";
import Spinner from "./Spinner";

function CustomBtn(props: BtnType) {
  return (
    <button
      className={`custom__btn ${props.isActive ? "active__btn" : ""}`}
      type={props.type || "button"}
      onClick={props.action}
      disabled={props.disabled}
    >
      {props.isLoading ? <Spinner /> : props.content}
    </button>
  );
}

export default CustomBtn;
