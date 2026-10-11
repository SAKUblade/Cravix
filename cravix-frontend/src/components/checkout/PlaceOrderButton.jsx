import { ArrowRight } from "lucide-react";

function PlaceOrderButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-semibold text-lg flex justify-center items-center gap-3 transition-all duration-300 hover:scale-[1.02]"
    >
      Place Order
      <ArrowRight size={22} />
    </button>
  );
}

export default PlaceOrderButton;