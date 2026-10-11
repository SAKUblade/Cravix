import "./SplashScreen.css";

function SplashScreen() {
  return (
    <div className="splash-screen">

      <div className="splash-content">

        <div className="logo-circle">
          C
        </div>

        <h1 className="logo-text">
          Cravix
        </h1>

        <p className="tagline">
          Fresh • Fast • Delicious
        </p>

        <p className="loading-text">
          Loading amazing food...
        </p>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
  );
}

export default SplashScreen;