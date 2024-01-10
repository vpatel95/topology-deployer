import React from "react";
import { useLocation, Outlet } from "react-router-dom";

import UserNavbar from "components/Navbars/UserNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import useAuth from "hooks/useAuth";

const UserLayout = (props) => {
  const {auth} = useAuth();
  const mainContent = React.useRef(null);
  const location = useLocation();

  const user = auth?.user;

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <Sidebar {...props}
        logo={{
          innerLink: "/user/dashboard",
          imgAlt: "...",
          imgSrc: require("assets/img/brand/argon-react.png"),
        }}
      />
      <div className="main-content" ref={mainContent}>
          <UserNavbar {...props} brandText={'TODO'} user={user} />
          <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
