import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.avif";
import Loader from "../Components/Loader/Loader";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getUserInfo = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_HOST_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setUserData(response.data.data.user);
        setIsLoggedIn(true);
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      // console.log(error);
      navigate("/auth/login");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("Areeb-token");
    if (token) {
      getUserInfo(token);
    }
  }, []);

  if (isLoading) return <Loader />;

  return (
    <nav
      className={
        "w-full sticky backdrop-blur-sm z-40 transition-normal duration-1000 bg-white/60 shadow-2xl border-2 border-gray-100 rounded-full mx-9 top-2 max-w-[calc(100%-4rem)]"
      }
    >
      <div
        className={
          "flex items-center justify-between mx-auto py-3.5 px-5 sm:px-8 max-w-7xl xl:max-w-full xl:px-12"
        }
      >
        <div className="flex items-center  gap-8">
          <Link to="/" className="shrink-0">
            <img src={logo} className="w-10 h-10" alt="logo" />
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center text-lg gap-9">
            <div className="flex items-center">
              <p className="mr-3">Wellcome {userData.email}</p>
              <FaUser className="" />
            </div>
            <Button
              label="LOGOUT"
              pt={{
                root: "px-4.5 py-2.5 bg-gray-700 hover:opacity-80 transition border-0 rounded-sm",
                label: "font-medium font-roboto text-sm text-white tracking-wide",
              }}
              severity="secondary"
              onClick={() => {
                localStorage.removeItem("Areeb-token");
                setIsLoggedIn(false);
                window.location.reload();
              }}
            ></Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              className={
                "text-gray-600 font-semibold text-[15px] cursor-pointer hover:underline mr-4"
              }
              onClick={() => navigate("/auth/login")}
            >
              Sign in
            </button>

            <Button
              label="GET STARTED"
              pt={{
                root: "px-4.5 py-2.5 bg-gray-700 hover:opacity-80 transition border-0 rounded-sm",
                label: "font-medium font-roboto text-sm text-white tracking-wide",
              }}
              severity="secondary"
              onClick={() => navigate("/auth/signup")}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
