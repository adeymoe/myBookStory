import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MyOrdersTab from "./MyOrdersTab";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  return (
    <nav className="sticky w-full z-30 top-0 py-3 bg-white shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-6">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden block"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 20 20"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>

        {/* Logo */}
        <NavLink className="flex items-center font-bold text-gray-800 text-xl" to="/">
          <svg
            className="fill-current text-gray-800 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z" />
          </svg>
          MyBookStory
        </NavLink>

        {/* Navigation Links */}
        <div className={`md:flex items-center space-x-6 ${menuOpen ? "block" : "hidden"}`}>
          <NavLink
            className={({ isActive }) =>
              `px-4 py-2 rounded-md ${isActive ? "bg-gray-200 text-black" : "text-gray-700 hover:text-black"}`
            }
            to="/buybooks"
          >
            BUY
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `px-4 py-2 rounded-md ${isActive ? "bg-gray-200 text-black" : "text-gray-700 hover:text-black"}`
            }
            to="/sellbooks"
          >
            SELL
          </NavLink>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <NavLink className={({ isActive }) =>
            `p-2 rounded-full transition ${isActive ? "bg-blue-300 text-black" : "text-gray-700 hover:text-black"
            }`
          } to="/profile">
            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
              <circle fill="none" cx="12" cy="7" r="3" />
              <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
            </svg>
          </NavLink>
          <div className="relative">
            <NavLink
              className="hover:text-black"
              to="#"
              onClick={() => setIsOrdersOpen(!isOrdersOpen)}
            >
              <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24">
                <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                <circle cx="10.5" cy="18.5" r="1.5" />
                <circle cx="17.5" cy="18.5" r="1.5" />
              </svg>
            </NavLink>

            {/* Dropdown Orders Tab */}
            <MyOrdersTab isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
