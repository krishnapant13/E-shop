import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const Cart = ({ setOpenCart }) => {
  const cartData = [
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
              onClick={() => setOpenCart(false)}
            />
          </div>
          {/* items lengthh */}
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text=[25px] font-[500] ">3 Items In Your Cart</h5>
          </div>{" "}
          <br />
          {/* cart single items */}
          <div className="w-full border-t overflow-scroll ">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
        <div className="px-5 mb-3 ">
          {/* checkout button */}
          <Link to="/checkout">
            <div
              className={` h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px] `}
            >
              <h1 className="text-white text-[18px] font-[600]">
                Checkout Now &#8377; 10000
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e44343] border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center  cursor-pointer `}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className={`bg-[#a7abb14f] border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer `}
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={18} color="#7d879c" />
          </div>
        </div>
        <img
          src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
          className="w-[80px] h-[80px] ml-2 "
          alt=""
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082] ">
            &#8377;{data.price} * {value}
          </h4>
          <h4 className=" font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto ">
            &#8377;{totalPrice}{" "}
          </h4>
        </div>
        <RxCross1 className=" cursor-pointer " size={12} />
      </div>
    </div>
  );
};

export default Cart;
