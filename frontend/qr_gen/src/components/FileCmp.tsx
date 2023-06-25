import "../style/FileCmp.css";
import IllustrationFile from "../assets/fileUploadIll.svg";
import { APP_MESSAGE } from "../helpers/constants";
import * as React from "react";

interface FileType {
  getFile: (value: FileList | null) => void;
}

function FileCmp(props: FileType) {
  const ref = React.useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <div className="parent">
        <div className="container__file child">
          <img src={IllustrationFile} className="" />
          <h3 className="text">{APP_MESSAGE.dropImageLabel}</h3>
        </div>
        <input
          type="file"
          className="input_file child2"
          ref={ref}
          onChange={(e) => props.getFile(e.target.files)}
        />
      </div>
    </div>
  );
}

export default FileCmp;
