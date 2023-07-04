import QrDisplay from "../../components/QrDisplay";
import { TypeQr } from "../../helpers/types";

function AllQr() {
  const qrs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const getAllQr = () => {
    return qrs.map((e) => (
      <div className="col-12 col-lg-4" key={qrs.indexOf(e)}>
        <QrDisplay
          url="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png"
          date={new Date()}
          typeQr={TypeQr.Link}
        ></QrDisplay>
      </div>
    ));
  };

  return <div className="row">{getAllQr()}</div>;
}

export default AllQr;
