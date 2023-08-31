import React, { useState } from "react";
import logo from "../assets/logo.png";
import userAvatar from "../assets/user-avatar.png";
import { logout } from "../services/auth.service";

function Header() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  return (
    <div className="bg-gray-800 text-white shadow-lg py-4 px-6 flex justify-between items-center relative">
      <div className="flex items-center">
        <img src={logo} alt="App logo" className="w-8 h-8 mr-3" />
        <span className="text-lg font-semibold">AutoRent</span>
      </div>
      <div>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="rounded-full"
        >
          <img src={userAvatar} alt="User avatar" className="w-8 h-8" />
        </button>
        <div
          className={`absolute top-12 right-0 w-48 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 transition-opacity ease-out duration-300 ${
            showDropdown ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="py-1">
            <button
              onClick={() => {
                logout();
                window.location.reload();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Logout
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
              User Parameters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
