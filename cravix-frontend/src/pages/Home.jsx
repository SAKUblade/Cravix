import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import RestaurantList from "../restaurant/RestaurantList";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Footer from "../components/layout/Footer";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <Navbar />

      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <RestaurantList
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />

      <WhyChooseUs />

      <Footer />
    </>
  );
}

export default Home;