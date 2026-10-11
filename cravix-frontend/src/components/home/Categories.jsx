import { useRef } from "react";
import "./Categories.css";

const categories = [
  {
    icon: "🍽️",
    title: "All",
  },
  {
    icon: "🍕",
    title: "Pizza",
  },
  {
    icon: "🍔",
    title: "Burgers",
  },
  {
    icon: "🥘",
    title: "Biryani",
  },
  {
    icon: "🥟",
    title: "Momos",
  },
  {
    icon: "🌯",
    title: "Rolls",
  },
  {
    icon: "☕",
    title: "Coffee",
  },
  {
    icon: "🍰",
    title: "Desserts",
  },
  {
    icon: "🍦",
    title: "Ice Cream",
  },
];

function Categories({ selectedCategory, setSelectedCategory }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -260,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 260,
      behavior: "smooth",
    });
  };

  return (
    <section className="categories">
      <div className="categories-container">

        <div className="categories-heading">

          <span className="section-tag">
            🔥 POPULAR CATEGORIES
          </span>

          <h2>
            What are you craving today?
          </h2>

          <p>
            Discover delicious food from the best restaurants around you.
          </p>

        </div>

        <div className="category-wrapper">

          <button
            className="slider-btn left"
            onClick={scrollLeft}
          >
            ❮
          </button>

          <div
            className="category-slider"
            ref={sliderRef}
          >

            {categories.map((item) => (

              <div
                key={item.title}
                onClick={() => setSelectedCategory(item.title)}
                className={`category-card ${
                  selectedCategory === item.title ? "active" : ""
                }`}
              >

                <div className="category-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <button className="explore-btn">
                  Explore
                  <span>→</span>
                </button>

              </div>

            ))}

          </div>

          <button
            className="slider-btn right"
            onClick={scrollRight}
          >
            ❯
          </button>

        </div>

      </div>
    </section>
  );
}

export default Categories;