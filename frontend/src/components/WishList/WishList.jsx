import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { AiFillHeart } from "react-icons/ai";


const WishList = ({ setOpenWishList }) => {
  const wishlistData = [
    {
      name: "Iphone 14 pro max 8/256GB",
      description: "test",
      price: 999,
    },
    {
      name: "Iphone 14 pro max 8/256GB",
      description: "test",
      price: 23,
    },
    {
      name: "Iphone 14 pro max 8/256GB",
      description: "test",
      price: 23,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004d] h-screen z-10 ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between  shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={20}
              className="cursor-pointer font-bold "
              onClick={() => setOpenWishList(false)}
            />
          </div>
          {/* items lengthh */}
          <div className={`${styles.normalFlex} p-4`}>
            <AiFillHeart color="red" size={25} />
            <h5 className="pl-2 text=[25px] font-[500] ">3 Items In Wishlist</h5>
          </div>{" "}
          <br />
          {/* wishlist single items */}
          <div className="w-full border-t overflow-scroll ">
            {wishlistData &&
              wishlistData.map((i, index) => <WishListSingle key={index} data={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
const WishListSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 size={10}/>
        <img
          src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
          className="w-[80px] h-[80px] ml-2 "
          alt=""
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className=" font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto ">
            &#8377;{totalPrice}{" "}
          </h4>
        </div>
        <div>
            <BsCartPlus size={20} classNames="cursor-pointer" title="Add to cart" />
        </div>
      </div>
    </div>
  );
};

export default WishList;
