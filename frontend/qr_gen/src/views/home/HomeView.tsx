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
import Logout from "../../components/Logout";
import CustomModal from "../../components/CustomModal";
import ValidateOrNotLogout from "../../components/ValidateOrNotLogout";

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
  const [modalState, setModalState] = React.useState(false);
  const { user, updateUser } = React.useContext(UserContext) as UserContextType;

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
    <div>
      <div className="main">
        <div className="first__part">
          {generateMenu()}
          <div className="bottom">
            <Logout action={() => setModalState(true)}></Logout>
          </div>
        </div>

        <div className="second__part_gn">
          <Outlet />
        </div>
      </div>

      <CustomModal
        show={modalState}
        title={APP_MESSAGE.reallyWantToLogout}
        children={
          <ValidateOrNotLogout
            cancelAction={() => setModalState(false)}
            logout={() => {
              setModalState(false);
              updateUser({ username: "", token: "", id: null });
            }}
          />
        }
      ></CustomModal>
    </div>
  ) : (
    <Navigate replace to={LOGIN_PATH} />
  );
}

export default HomeView;
