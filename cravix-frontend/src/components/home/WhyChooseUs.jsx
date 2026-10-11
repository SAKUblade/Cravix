import "./WhyChooseUs.css";

import {
  Bike,
  ShieldCheck,
  Clock3,
  CreditCard,
  Star,
  UtensilsCrossed,
} from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      icon: <Bike size={34} />,
      title: "Fast Delivery",
      description:
        "Get your favorite meals delivered in 25–30 minutes with real-time tracking.",
    },
    {
      icon: <UtensilsCrossed size={34} />,
      title: "Premium Restaurants",
      description:
        "Choose from hundreds of trusted restaurants serving fresh, delicious food.",
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Safe & Hygienic",
      description:
        "Every restaurant follows strict hygiene standards and quality checks.",
    },
    {
      icon: <Clock3 size={34} />,
      title: "24/7 Ordering",
      description:
        "Order breakfast, lunch, dinner or late-night snacks anytime you want.",
    },
    {
      icon: <CreditCard size={34} />,
      title: "Secure Payments",
      description:
        "Pay safely using UPI, Cards, Net Banking, Wallets or Cash on Delivery.",
    },
    {
      icon: <Star size={34} />,
      title: "Top Rated Service",
      description:
        "Thousands of happy customers trust Cravix every single day.",
    },
  ];

  return (
    <section className="why-section">
      <div className="why-container">

        <div className="why-heading">
          <span className="why-tag">⭐ WHY CHOOSE CRAVIX</span>

          <h2>
            Food Delivery <span>Made Better</span>
          </h2>

          <p>
            We combine fast delivery, premium restaurants, secure payments,
            and outstanding customer service to make every food order simple,
            enjoyable, and reliable.
          </p>
        </div>

        <div className="why-grid">
          {features.map((feature) => (
            <div key={feature.title} className="why-card">

              <div className="why-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>
          ))}
        </div>

        <div className="why-stats">

          <div>
            <h3>250+</h3>
            <p>Restaurants</p>
          </div>

          <div>
            <h3>10K+</h3>
            <p>Orders Delivered</p>
          </div>

          <div>
            <h3>4.9★</h3>
            <p>Customer Rating</p>
          </div>

          <div>
            <h3>25 Min</h3>
            <p>Average Delivery</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;