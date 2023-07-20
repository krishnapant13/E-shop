import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero.jsx";
import Categories from "../components/Route/Categories.jsx";
import BestDeals from "../components/Route/BestDeals.jsx";
import FeatureProducts from "../components/Route/FeatureProducts.jsx";
import Events from "../components/Route/Events.jsx";
import Sponsers from "../components/Route/Sponsers.jsx";
import Footer from "../components/Layout/Footer.jsx";
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeatureProducts />
      <Sponsers />
      <Footer/>
    </div>
  );
};

export default HomePage;
