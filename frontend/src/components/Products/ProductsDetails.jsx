import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductsDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=450230942sdfnsd");
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] `}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />{" "}
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className=" h-[200px] "
                      onClick={() => {
                        setSelect(0);
                      }}
                    />
                  </div>{" "}
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className=" h-[200px] "
                      onClick={() => {
                        setSelect(1);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] ">
                <div className="w-full">
                  <h1 className={`${styles.productTitle} pt-5`}>{data.name}</h1>
                  <p>{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discount_price} &#8377;{" "}
                    </h4>
                    <h3 className={styles.price}>
                      {data.price ? <span>{data.price} &#8377;</span> : null}
                    </h3>
                  </div>
                  <div className=" flex items-center mt-12 justify-between pr-3">
                    <div>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                        {count}
                      </span>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer  "
                          onClick={() => setClick(!click)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer  "
                          onClick={() => setClick(!click)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                >
                  <span className="text-white flex items-center ">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2 "
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pb-1 pt-1 `}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11 `}
                    onClick={() => handleMessageSubmit()}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className={`bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ]`}>
      <div className={`w-full flex justify-between pt-10 border-b pb-2`}>
        <div className="relative">
          <h5
            className={`text-[#000]  text-[10px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`text-[#000]  text-[10px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(2)}
          >
            Product Review
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`text-[#000]  text-[10px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]`}
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 && <div className={`${styles.active_indicator}`} />}
        </div>
      </div>
      {active === 1 && (
        <>
          <p className="py-3 text-[18px] leading-8 pb-10 whitespace-pre-line ">
            1 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
            voluptatem ducimus fugiat soluta ut in, inventore laudantium
            nesciunt excepturi! Maxime fuga, amet enim ipsum voluptatem
            obcaecati non officia cumque magni. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Hic perferendis quidem necessitatibus
            neque explicabo, exercitationem quae perspiciatis quod, voluptates
            itaque sint beatae natus provident optio sequi eaque dolorum, cum
            repellat! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Quae, unde tempora quibusdam magnam temporibus numquam asperiores
            voluptas impedit amet. Obcaecati enim hic dolorum! Sed dolore quam
            minus nihil quis corporis.
          </p>{" "}
          <p className="py-3 text-[18px] leading-8 pb-10 whitespace-pre-line ">
            2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
            voluptatem ducimus fugiat soluta ut in, inventore laudantium
            nesciunt excepturi! Maxime fuga, amet enim ipsum voluptatem
            obcaecati non officia cumque magni. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Hic perferendis quidem necessitatibus
            neque explicabo, exercitationem quae perspiciatis quod, voluptates
            itaque sint beatae natus provident optio sequi eaque dolorum, cum
            repellat! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Quae, unde tempora quibusdam magnam temporibus numquam asperiores
            voluptas impedit amet. Obcaecati enim hic dolorum! Sed dolore quam
            minus nihil quis corporis.
          </p>{" "}
        </>
      )}

      {active === 2 && (
        <div className="w-full justify-center min-h-[40vh] flex items-center ">
          <p>No Reviews yet!</p>
        </div>
      )}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt=""
                className="w-[50px] h-[50px] rounded-full "
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>{" "}
            <p className="pt-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo,
              saepe quod. Accusamus deserunt, eius perferendis error cum quis
              nulla eaque veniam tempora fuga voluptas totam vitae ducimus
              laudantium quidem amet!
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Join on : <span className="font-[500]">13 March, 2023</span>
              </h5>{" "}
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">1,229</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">229</span>
              </h5>
              <Link to={"/"}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop </h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetails;
