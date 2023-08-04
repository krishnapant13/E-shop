import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllProducts from "../../components/Shop/Layout/AllProducts.jsx";
const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[60px] 800px:w-[330px]">
          <DashboardSidebar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
