import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUtensils, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../context/useAuth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}

        <Link to="/" className="logo">
          <div className="logo-icon">
            <FaUtensils />
          </div>

          <div className="logo-text">
            <h1>CRAVIX</h1>
            <span>Food Delivery</span>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="nav-links">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Home
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                isActive ? "active-link" : ""
              }
            >
              My Orders
            </NavLink>
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `cart-link ${isActive ? "active-link" : ""}`
            }
          >
            <FaShoppingCart />
            Cart
          </NavLink>

        </nav>

        {/* Right */}

        <div className="nav-actions">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span
                style={{
                  fontWeight: 600,
                  marginRight: "12px",
                }}
              >
                Hi, {user?.name}
              </span>

              <button
                className="login-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;