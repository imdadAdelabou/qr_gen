import { Modal } from "react-bootstrap";
import style from "../style/custommodal.module.css";

interface ModalType {
  show: boolean;
  title: string;
  children: JSX.Element;
}

function CustomModal(props: ModalType) {
  return (
    <Modal show={props.show} centered>
      <Modal.Body>
        <h1 className={style.main__title}>{props.title}</h1>
        {props.children}
      </Modal.Body>
    </Modal>
  );
}

export default CustomModal;
