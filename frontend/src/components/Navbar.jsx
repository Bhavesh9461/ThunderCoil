import React from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { Link, useLocation } from "react-router";
import { BellIcon, CloudLightning, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
import useLogout from "../hooks/useLogout.js";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const isHomePage = location.pathname === "/"

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          { (isChatPage || isHomePage ) && (
            <div className={` ${isHomePage ? "lg:hidden" : "" } sm:pl-5 `}>
              <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5">
                <CloudLightning className="size-4 sm:size-7 md:size-9 text-primary" />
                <span className="text-md sm:text-xl md:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-wider">
                  ThunderCoil
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-1 sm:gap-3 md:gap-4 ml-auto">
            {/* NOTIFICATIONS LINK */}
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-4 w-4  sm:h-6 sm:w-6 text-base-content opacity-70" />
              </button>
            </Link>

            {/* THEME SELECTOR */}
            <ThemeSelector />

            {/* USER AVATAR */}
            <Link to="/">
              <div className="avatar">
                <div className="w-7 sm:w-9 rounded-full border border-base-300">
                  <img
                    src={authUser?.profilePic}
                    alt="User Avatar"
                    rel="noreferrer"
                  />
                </div>
              </div>
            </Link>

            {/* LOGOUT BUTTON */}
            <button
              className="btn btn-ghost btn-circle"
              onClick={logoutMutation}
            >
              <LogOutIcon className="h-4 w-4  sm:h-6 sm:w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
