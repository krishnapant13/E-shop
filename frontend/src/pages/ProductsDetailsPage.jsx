import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductsDetails from "../components/Products/ProductsDetails";
import SuggestedProduct from "../components/SuggestedProduct/SuggestedProduct.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductsDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const data = allProducts && allProducts.find((i) => i._id === id);
    setData(data);
  }, [data, allProducts]);
  return (
    <div>
      <Header />
      <ProductsDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductsDetailsPage;
