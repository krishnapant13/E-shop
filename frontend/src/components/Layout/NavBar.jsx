import React, { useState } from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";
import Drowpdown from "./Drowpdown";

import { categoriesData } from "../../static/data";
import { IoIosArrowDown } from "react-icons/io";

const NavBar = ({ active }) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className={`block 800px:${styles.normalFlex} `}>
      {" "}
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex" key={index}>
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-block 800px:text-[#fff]"
              } pb-[20px] 800px:pb-0 font-[500] px-6 cursor-pointer `}
            >
              {i.title}
            </Link>
          </div>
        ))}{" "}
      <div onClick={() => setDropDown(!dropDown)}>
        <div className=" relative h-[60px] mt-[10px] w-auto hidden 1000px:block">
          {/* <BiMenuAltLeft
                size={30}
                className="absolute top-3 left-2 text-white"
              /> */}
          <button
            className={`h-[80%] w-full flex justify-between items-center pl-10    text-white  font-sans text-lg font-[500] select-none rounded-t-md`}
          >
            {/* bg-gradient-to-r from-blue-900 via-purple to-black */}
            Categories
          </button>
          <IoIosArrowDown
            size={20}
            color="white"
            className="absolute left-[132px] top-4 cursor-pointer"
            onClick={() => setDropDown(!dropDown)}
          />
          {dropDown ? (
            <Drowpdown
              categoriesData={categoriesData}
              setDropDown={setDropDown}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
