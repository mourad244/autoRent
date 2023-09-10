import React, { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import menuItems from "./MenuItems";

export function NavbarDefault() {
  const location = useLocation();

  const initialSelectedItem =
    menuItems.find((item) => item.link === location.pathname)?.name ||
    "Accueil";
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(initialSelectedItem);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {menuItems.map((item) => (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-normal w-fit ${
            item.name === selectedItem
              ? "text-blue-500 border-b-2 border-blue-500"
              : ""
          }`}
          key={item.name}
        >
          <Link
            to={item.link}
            onClick={() => setSelectedItem(item.name)}
            className="flex items-center"
          >
            {item.name}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar
      className=" py-2 lg:px-8 max-w-screen-3xl lg:py-4 rounded-none"
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="hidden lg:block">{navList}</div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
    </Navbar>
  );
}
