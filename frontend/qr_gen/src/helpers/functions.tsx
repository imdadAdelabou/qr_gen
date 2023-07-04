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

export async function downloadQrCode(url: string, type: string) {
  return await fetch(url, { method: "GET" })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `qrCode-${type}-${Date.now()}.png`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
    });
}



export default openToast;
