import { InputType } from "../helpers/types";
import "../style/login.css";

function CustomInput(props: InputType) {

    return <>
    <input className="customInput" type={props.typeInput} placeholder={props.hintText} />
    </>
}

export default CustomInput;
