import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      <Navbar />

      <div className="flex flex-col flex-1">
        <div className="flex-1">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
