import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductsDetails from "../components/Products/ProductsDetails.jsx";
import SuggestedProduct from "../components/SuggestedProduct/SuggestedProduct.jsx";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";

const ProductsDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  useEffect(() => {
    const data = productData.find((i) => i.name === productName);
    setData(data);
  }, []);
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
