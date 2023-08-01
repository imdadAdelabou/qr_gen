import * as React from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { ItemMenuType, UserContextType } from "../../helpers/types";
import { APP_MESSAGE, LOGIN_PATH } from "../../helpers/constants";
import { UserContext } from "../stores/UserContext";
import "../../style/Dashboard.css";
import Link from "./generate/Link";
import UploadFile from "./generate/UploadFile";
import AllQr from "./AllQr";
import ContactCard from "./generate/ContactCard";

const menus: ItemMenuType[] = [
  {
    icon: "",
    label: APP_MESSAGE.allQrCodeLabel,
    route: "",
    element: <AllQr />,
  },
  {
    icon: "",
    label: APP_MESSAGE.linkLabel,
    route: "generate/link",
    element: <Link />,
  },
  {
    icon: "",
    label: APP_MESSAGE.contactLabel,
    route: "generate/contact-card",
    element: <ContactCard />,
  },
  {
    icon: "",
    label: APP_MESSAGE.fileLabel,
    route: "/generate/upload-file",
    element: <UploadFile />,
  },
];

function HomeView() {
  const { user } = React.useContext(UserContext) as UserContextType;

  const generateMenu = () => {
    // item_active
    return menus.map((menu) => {
      const index = menus.indexOf(menu);

      return (
        <NavLink
          to={`${menu.route}`}
          className={({ isActive }) =>
            `menu_item_style ${isActive ? "item_active" : ""}`
          }
          key={index}
        >
          {menu.label}
        </NavLink>
      );
    });
  };

  return user && user?.token ? (
    <div className="main">
      <div className="first__part">{generateMenu()}</div>
      <div className="second__part_gn">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate replace to={LOGIN_PATH} />
  );
}

export default HomeView;
