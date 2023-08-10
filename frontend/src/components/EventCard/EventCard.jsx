import React from "react";
import styles from "../../styles/styles";
import CountDown from "../CountDown/CoutDown.jsx";
import { backend_url } from "../../server";

const EventCard = ({ active, data }) => {
  return (
    <div
      className={`w-full block bg-white h-[79.2vh] ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      {data && (
        <div className="w-full lg:w-[50%] m-auto ">
          <img src={`${backend_url}${data.images[0]}`} alt="" />
        </div>
      )}
      {data && (
        <div className="w-full lg:[w-50%] flex flex-col justify-center">
          <h2 className={`${styles.productTitle} `}>{data.name}</h2>
          <p>{data.description}</p>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <h5 className="font-bold text-[20px] text-[#333] font-Roboto ">
                ₹{data.discountPrice}
              </h5>{" "}
              <h5 className="font-[500] text-[15px] text-[#d55b45] pl-2 line-through ">
                ₹{data.originalPrice}
              </h5>
            </div>
            <span className="pr-3 font-[400] text-[17px] text-[#44a55e] ">
              120 sold
            </span>
          </div>
          <CountDown data={data} />
        </div>
      )}
    </div>
  );
};

export default EventCard;
