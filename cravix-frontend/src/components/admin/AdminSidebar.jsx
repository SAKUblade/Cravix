import {
  LayoutDashboard,
  ClipboardList,
  Store,
  UtensilsCrossed,
  LogOut,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/useAuth";

import "./AdminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      title: "Orders",
      icon: ClipboardList,
      path: "/admin/orders",
    },
    {
      title: "Restaurants",
      icon: Store,
      path: "/admin/restaurants",
    },
    {
      title: "Menu",
      icon: UtensilsCrossed,
      path: "/admin/menu",
    },
  ];

  const handleLogout = () => {
    console.log("🔥 LOGOUT BUTTON CLICKED");

    logout();

    console.log("🔥 LOGOUT FUNCTION CALLED");

    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">

      {/* LOGO */}

      <div className="admin-logo">
        <h2>CRAVIX</h2>
        <span>Admin Panel</span>
      </div>

      {/* MENU */}

      <nav className="admin-menu">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                isActive
                  ? "admin-link active"
                  : "admin-link"
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={handleLogout}
        type="button"
      >
        <LogOut size={18} />

        <span>Logout</span>
      </button>

    </aside>
  );
}

export default AdminSidebar;