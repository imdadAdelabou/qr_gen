import { BtnType } from "../helpers/types";
import "../style/CustomBtn.css";

function CustomBtn(props: BtnType) {
  return (
    <button className="custom__btn" type={props.type || "button"} onClick={props.action}>
      {props.content}
    </button>
  );
}

export default CustomBtn;
