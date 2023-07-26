import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlinePoweroff,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
} from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1, RxPencil1 } from "react-icons/rx";
import Dropdown from "./Drowpdown.jsx";
import NavBar from "./NavBar.jsx";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import logo from "../../assets/logo/logo.jpeg";
import Cart from "../Cart/Cart.jsx";
import WishList from "../WishList/WishList.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [serachTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };
  const logOutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        toast.success(res);
        navigate("/login");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className={`${styles.section}`}>
        {/*header section */}
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex item-center justify-between items-center ">
          <div className="w-[5%]">
            <Link to="/">
              <img className="rounded-full " src={logo}></img>
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="search"
              name=""
              value={serachTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              placeholder="Search Product..."
              id=""
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1 cursor-pointer"
            />
            {serachTerm && searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 ">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${product_name}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={i.image_Url[0].url}
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      {/* navbar section */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } " transition hidden 800px:flex items-center justify-between w-full bg-[#332ac8] h-[70px] " `}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* categories */}
          <div>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                onClick={() => setDropDown(!dropDown)}
                className="h-[80%] w-full flex justify-between items-center pl-10 bg-[#fff] font-sans text-lg font-[500] select-none rounded-t-md "
              >
                All Categories
              </button>
              {dropDown ? (
                <IoIosArrowUp
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer "
                  onClick={() => setDropDown(!dropDown)}
                />
              ) : (
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer "
                  onClick={() => setDropDown(!dropDown)}
                />
              )}
              {dropDown ? (
                <Dropdown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>{" "}
          </div>
          {/* navitems */}
          <div className={`${styles.normalFlex}`}>
            <NavBar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      className="h-7 w-7 rounded-full object-cover "
                      src={`${backend_url}${user.avatar}`}
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%" />
                  </Link>
                )}
              </div>
              {user && (
                <AiOutlinePoweroff
                  title="Logout"
                  className="cursor-pointer"
                  color="white"
                  size={20}
                  onClick={() => logOutHandler()}
                />
              )}
            </div>
            {/* Cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* wishlist popup */}
            {openWishlist ? (
              <WishList setOpenWishList={setOpenWishList} />
            ) : null}
          </div>
        </div>
      </div>
      {/* mobile header */}
      <div
        className={` ${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[60px] fixed bg-white z-10 top-0 left-0 shadow-sm pt-2 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between ">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="w-[9%] mt-2 cursor-pointer">
            <Link to="/">
              <img className="rounded-full " src={logo}></img>
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart className="mt-2" size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* header sidebar
       */}
      {open && (
        <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 800px:hidden block">
          <div className="fixed w-[65%] bg-white h-screen top-0 left-0 z-20">
            <div className="w-full justify-between flex pr-3">
              <div>
                <div className="relative mr-[15px]">
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                    0
                  </span>
                </div>
              </div>
              <RxCross1
                size={20}
                className="ml-4 mt-5"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="my-8 w-[92%] m-auto h-[40px] relative">
              <input
                type="search"
                placeholder="Search Product"
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md "
                value={serachTerm}
                onChange={handleSearchChange}
              />
              {serachTerm && searchData && (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-20 p-4 ">
                  {searchData &&
                    searchData.map((i) => {
                      const d = i.name;
                      const product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${product_name}`}>
                          <div className="w-full flex items-start-py-3">
                            <img
                              src={i.image_Url[0].url}
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              )}
            </div>
            <NavBar active={activeHeading} />
            <div className={`${styles.button} ml-4 !rounded-[4px]`}>
              <Link to="/seller">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>{" "}
            <br />
            <br />
            <br />
            <div className="text-[18px] pr-[10px] text-[#00000060] ">
              {
                <>
                  {isAuthenticated && (
                    <>
                      <Link to="/profile">
                        <img
                          className="h-[100px] w-[100px] border-[3px] mb-5 border-[#02ffb3] rounded-full object-cover "
                          src={`${backend_url}${user.avatar}`}
                          alt=""
                        />
                      </Link>

                      <Link
                        to="/sign-up"
                        className="text-[18px]  text-[#00000060] "
                      >
                        <div className="flex items-center justify-center">
                          <AiOutlineUser onClick={() => logOutHandler()} />{" "}
                          Logout
                        </div>
                      </Link>
                    </>
                  )}
                </>
              }
            </div>
            {!isAuthenticated && (
              <div className="flex items-center w-full justify-around">
                <div className="flex items-center">
                  <Link
                    to="/Login"
                    className="text-[18px] text-[#00000060] flex items-center"
                  >
                    <AiOutlineUser className="mr-2" />
                    <span>Login</span>
                  </Link>
                </div>
                <div className="flex items-center">
                  <Link
                    to="/sign-up"
                    className="text-[18px] text-[#00000060] flex items-center"
                  >
                    <RxPencil1 className="mr-2" />
                    <span>Signup</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
