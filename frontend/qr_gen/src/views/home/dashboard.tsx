import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ItemMenuType, UserContextType } from "../../helpers/types";
import { APP_MESSAGE, LOGIN_PATH } from "../../helpers/constants";
import { UserContext } from "../stores/UserContext";
import "../../style/dashboard.css";
import Link from "./generate/Link";
import ContactCard from "./generate/ContactCard";
import AllQr from "./AllQr";
import UploadFile from "./generate/UploadFile";

const menus: ItemMenuType[] = [
  // {
  //   icon: "",
  //   label: APP_MESSAGE.allQrCodeLabel,
  //   route: "",
  //   element: <AllQr />,
  // },
  {
    icon: "",
    label: APP_MESSAGE.linkLabel,
    route: "/",
    element: <Link />,
  },
  // {
  //   icon: "",
  //   label: APP_MESSAGE.contactLabel,
  //   route: "generate/contact-card",
  //   element: <ContactCard />,
  // },
  {
    icon: "",
    label: APP_MESSAGE.fileLabel,
    route: "/generate/upload-file",
    element: <UploadFile />,
  },
];

function HomeView() {
  const { user } = React.useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentElement, setCurrentElement] = React.useState(menus[0].element);

  const generateMenu = () => {
    // item_active
    return menus.map((menu) => {
      const index = menus.indexOf(menu);

      return (
        <li
          className={`menu_item_style ${
            currentIndex == index ? "item_active" : ""
          }`}
          key={index}
          onClick={() => {
            setCurrentIndex(index);
            setCurrentElement(menu.element);
            navigate(menu.route);
          }}
        >
          {menu.label}
        </li>
      );
    });
  };

  return user && user?.token ? (
    <div className="main">
      <div className="first__part">{generateMenu()}</div>
      <div className="second__part_gn">{currentElement}</div>
    </div>
  ) : (
    <Navigate replace to={LOGIN_PATH} />
  );
}

export default HomeView;
