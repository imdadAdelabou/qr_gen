import { toast } from "react-toastify";
import { TypeResponse } from "./types";

function openToast(message: string, typeToast: TypeResponse) {
  toast(message, {
    type:
      typeToast == TypeResponse.ERROR
        ? "error"
        : typeToast == TypeResponse.SUCCESS
        ? "success"
        : "info",
  });
}

export default openToast;
