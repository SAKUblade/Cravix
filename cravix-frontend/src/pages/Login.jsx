import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../services/api";
import { useAuth } from "../context/useAuth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login: authLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email.trim()) {
      return toast.error("Please enter your email");
    }

    if (!password.trim()) {
      return toast.error("Please enter your password");
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email: email.trim(),
        password,
      });

      if (!response.data?.token || !response.data?.user) {
        throw new Error("Invalid login response");
      }

      // Save authentication
      authLogin(
        response.data.user,
        response.data.token
      );

      toast.success("Login successful");

      // ==========================================
      // CHECK WHERE USER CAME FROM
      // ==========================================

      const redirectPath =
        location.state?.from?.pathname;

      const redirectQuery =
        new URLSearchParams(location.search).get(
          "redirect"
        );

      // ==========================================
      // CHECKOUT REDIRECT
      // ==========================================

      if (
        redirectQuery === "true" &&
        redirectPath
      ) {
        navigate(redirectPath, {
          replace: true,
        });

        return;
      }

      // ==========================================
      // DEFAULT LOGIN REDIRECT
      // ==========================================

      navigate("/", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="logo">
          <span className="logo-red">C</span>
          ravix
        </h1>

        <p className="tagline">
          Fresh • Fast • Delicious
        </p>

        <h2>
          Welcome Back
        </h2>

        <p className="subtitle">
          Login to continue ordering your favourite meals.
        </p>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p className="register-link">
          Don't have an account?

          <Link
            to="/register"
            state={location.state}
          >
            {" "}
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;