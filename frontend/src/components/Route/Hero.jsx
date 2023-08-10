import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeats bg-cover ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1506806770414-b0e5db562f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80)",
        // https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#ffffff] font-[600] capitalize">
          Best Collection Of <br /> Resin Products
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#fff] ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut ipsum
          doloremque cupiditate quae? Nulla voluptates deserunt sequi aliquam
          temporibus quas corporis adipisci accusamus, illo, doloribus,
          necessitatibus tempore perspiciatis similique nisi!
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5 bg-gradient-to-r from-blue-900 via-purple to-black`}>
            <span className="text-[#fff] font-[Poppins] text-[18px] ">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
