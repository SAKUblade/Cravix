import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import "./Hero.css";
import Counter from "./Counter";
import heroImage from "../../assets/hero-food.png";

function Hero({ searchTerm, setSearchTerm }) {
  const [results, setResults] = useState([]);

  const searchFood = async (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await API.get(
        `/restaurants/search-food?q=${encodeURIComponent(value)}`
      );

      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">

        {/* LEFT */}
        <div className="hero-content">

          <span className="hero-tag">
            🍔 Fresh • Fast • Delicious
          </span>

          <h1 className="hero-title">
            Discover Food
            <br />
            <span>Near You</span>
          </h1>

          <p className="hero-description">
            Order from the best restaurants in your city.
            Fresh ingredients, lightning-fast delivery,
            and thousands of delicious meals waiting for you.
          </p>

          {/* Search */}
          <div className="hero-search-wrapper">

            <div className="hero-search">

              <input
                type="text"
                placeholder="Search food..."
                value={searchTerm}
                onChange={(e) => searchFood(e.target.value)}
              />

              <button>
                Explore
              </button>

            </div>

            {results.length > 0 && (
              <div className="search-dropdown">

                {results.map((food) => (

                  <Link
                    key={food.id}
                    to={`/restaurants/${food.restaurant_id}`}
                    className="search-item"
                    onClick={() => {
                      setSearchTerm("");
                      setResults([]);
                    }}
                  >

                    <img
                      src={food.image_url}
                      alt={food.name}
                    />

                    <div>
                      <h4>{food.name}</h4>
                      <p>{food.restaurant_name}</p>
                    </div>

                  </Link>

                ))}

              </div>
            )}

          </div>

          {/* Stats */}
          <div className="hero-stats">

            <div className="hero-stat">
              <h2>
                <Counter end={250} suffix="+" />
              </h2>
              <span>Restaurants</span>
            </div>

            <div className="hero-stat">
              <h2>
                <Counter end={10000} suffix="+" />
              </h2>
              <span>Orders Delivered</span>
            </div>

            <div className="hero-stat">
              <h2>
                <Counter end={25} suffix=" min" />
              </h2>
              <span>Average Delivery</span>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="hero-image">

          <img
            src={heroImage}
            alt="Delicious Food"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;