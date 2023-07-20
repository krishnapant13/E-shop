import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeats ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/7256642/pexels-photo-7256642.jpeg?auto=compress&cs=tinysrgb&w=1350)",
        // https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#201f1f] font-[600] capitalize">
          Best Collection Of <br /> Resin Products      
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text=[#000000ba] ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut ipsum
          doloremque cupiditate quae? Nulla voluptates deserunt sequi aliquam
          temporibus quas corporis adipisci accusamus, illo, doloribus,
          necessitatibus tempore perspiciatis similique nisi!
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
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
