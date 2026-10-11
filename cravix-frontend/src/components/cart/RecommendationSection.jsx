import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import API from "../../services/api";
import { useCart } from "../../context/useCart";

function RecommendationSection() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const fetchRecommendations = async () => {
    try {
      const { data } = await API.get(
        "/restaurants/recommendations"
      );

      setFoods(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const loadRecommendations = async () => {
    await fetchRecommendations();
  };

  loadRecommendations();
}, []);

  if (loading) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold">
          You might also like
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">

      <div className="flex items-end justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-900">
            You might also like
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Discover more delicious food.
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {foods.map((food) => (

          <div
            key={food.id}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >

            <div className="h-40 overflow-hidden">

              <img
                src={
                  food.image_url ||
                  "https://placehold.co/600x400?text=Food"
                }
                alt={food.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />

            </div>

            <div className="p-4">

              <p className="text-xs text-red-600 font-medium mb-1">
                {food.restaurant_name}
              </p>

              <h3 className="font-bold text-gray-900 line-clamp-1">
                {food.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {food.category}
              </p>

              <div className="flex items-center justify-between mt-4">

                <span className="text-lg font-bold">
                  ₹{food.price}
                </span>

                <button
                  onClick={() => {
                    addToCart(food);

                    toast.success(
                      `${food.name} added to cart`
                    );
                  }}
                  className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition"
                >
                  <Plus size={18} />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default RecommendationSection;