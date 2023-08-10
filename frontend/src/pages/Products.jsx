import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const categoryData = searchParams.get("category");
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    if (categoryData === null) {
      const d =
        allProducts && [...allProducts].sort((a, b) => a.sold_out - b.sold_out);
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts]);
  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}></div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px]  lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]  px-12 mb-12 ">
        {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
      </div>{" "}
      {data && data.length === 0 ? (
        <h1 className=" text-center w-full pb-[110px] text-[20px] ">
          No Products Found!
        </h1>
      ) : null}
    </div>
  );
};

export default Products;
