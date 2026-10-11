import { useEffect, useState } from "react";
import { getRestaurants } from "../../services/restaurantService";
import RestaurantCard from "../../restaurant/RestaurantCard";

function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Featured Restaurants
        </h2>

        <p>Loading restaurants...</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-3xl font-bold mb-8">
        Featured Restaurants
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}

      </div>

    </section>
  );
}

export default FeaturedRestaurants;