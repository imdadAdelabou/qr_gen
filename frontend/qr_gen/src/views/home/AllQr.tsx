import QrDisplay from "../../components/QrDisplay";
import { TypeQr } from "../../helpers/types";

function AllQr() {
  return (
    <div>
      <QrDisplay
        url="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png"
        date={new Date()}
        typeQr={TypeQr.Link}
      ></QrDisplay>
    </div>
  );
}

export default AllQr;
