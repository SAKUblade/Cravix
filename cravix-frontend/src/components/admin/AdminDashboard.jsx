import { useEffect, useState } from "react";
import API from "../../services/api";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import DashboardCard from "./DashboardCard";

import {
  ShoppingBag,
  IndianRupee,
  Store,
  Users,
  ArrowRight,
  Clock3,
  ChefHat,
  Bike,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Wallet,
  Ban,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalRestaurants: 0,
    totalUsers: 0,
    deliveredRevenue: 0,
    activeRevenue: 0,
    cancelledRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [orderStatus, setOrderStatus] = useState({
    
    pending: 0,
    accepted: 0,
    preparing: 0,
    ready: 0,
    "out for delivery": 0,
    delivered: 0,
    cancelled: 0,
  });

  const activeOrders =
  orderStatus.pending +
  orderStatus.accepted +
  orderStatus.preparing +
  orderStatus.ready +
  orderStatus["out for delivery"];

const averageOrderValue =
  stats.totalOrders > 0
    ? stats.totalRevenue / stats.totalOrders
    : 0;

  useEffect(() => {
    fetchDashboard();
    fetchRecentOrders();
  }, []);

  // =========================
  // DASHBOARD STATS
  // =========================

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard/stats");

      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Dashboard stats error:", err);
    }
  };

  // =========================
  // RECENT ORDERS + STATUS
  // =========================

  const fetchRecentOrders = async () => {
    try {
      setLoadingOrders(true);

      const { data } = await API.get("/orders");

      if (data.success) {
        const orders = data.orders || [];

        setRecentOrders(orders.slice(0, 5));

        const statusCounts = {
          pending: 0,
          accepted: 0,
          preparing: 0,
          ready: 0,
          "out for delivery": 0,
          delivered: 0,
          cancelled: 0,
        };

        orders.forEach((order) => {
          const status = (
            order.status || "pending"
          ).toLowerCase();

          if (statusCounts[status] !== undefined) {
            statusCounts[status]++;
          }
        });

        setOrderStatus(statusCounts);
      }
    } catch (err) {
      console.error("Recent orders error:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // =========================
  // STATUS ICON
  // =========================

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock3 size={16} />;

      case "accepted":
      case "preparing":
        return <ChefHat size={16} />;

      case "ready":
      case "out for delivery":
        return <Bike size={16} />;

      case "delivered":
        return <CheckCircle2 size={16} />;

      case "cancelled":
        return <XCircle size={16} />;

      default:
        return <Clock3 size={16} />;
    }
  };

  // =========================
  // FORMAT STATUS
  // =========================

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <div className="admin-dashboard">

          {/* =========================
              DASHBOARD HEADER
          ========================= */}

          <div className="dashboard-header">
            <div>
              <h1>Dashboard</h1>

              <p>
                Overview of your Cravix business
              </p>
            </div>
          </div>

          {/* =========================
              MAIN STATISTICS
          ========================= */}

          <div className="dashboard-grid">

            <DashboardCard
              title="Orders"
              value={stats.totalOrders}
              icon={<ShoppingBag />}
            />

            <DashboardCard
              title="Revenue"
              value={`₹${stats.totalRevenue}`}
              icon={<IndianRupee />}
            />

            <DashboardCard
              title="Restaurants"
              value={stats.totalRestaurants}
              icon={<Store />}
            />

            <DashboardCard
              title="Users"
              value={stats.totalUsers}
              icon={<Users />}
            />

          </div>

          {/* =========================
              REVENUE SUMMARY
          ========================= */}

          <section className="dashboard-section">

            <div className="section-header">
              <div>
                <h2>Revenue Overview</h2>

                <p>
                  Current revenue breakdown
                </p>
              </div>
            </div>

            <div className="revenue-grid">

              <div className="revenue-card">
  <div className="revenue-card-icon active">
    <ShoppingBag size={21} />
  </div>

  <div className="revenue-card-content">
    <span>Active Orders</span>

    <strong>{activeOrders}</strong>

    <small>
      Orders currently in progress
    </small>
  </div>
</div>

<div className="revenue-card">
  <div className="revenue-card-icon total">
    <IndianRupee size={21} />
  </div>

  <div className="revenue-card-content">
    <span>Average Order Value</span>

    <strong>
      ₹{averageOrderValue.toFixed(0)}
    </strong>

    <small>
      Average value per order
    </small>
  </div>
</div>

              {/* TOTAL REVENUE */}

              <div className="revenue-card">
                <div className="revenue-card-icon total">
                  <TrendingUp size={21} />
                </div>

                <div className="revenue-card-content">
                  <span>Total Revenue</span>

                  <strong>
                    ₹
                    {Number(
                      stats.totalRevenue || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                  <small>
                    From non-cancelled orders
                  </small>
                </div>
              </div>

              {/* DELIVERED */}

              <div className="revenue-card">
                <div className="revenue-card-icon delivered">
                  <CheckCircle2 size={21} />
                </div>

                <div className="revenue-card-content">
                  <span>Delivered Revenue</span>

                  <strong>
                    ₹
                    {Number(
                      stats.deliveredRevenue || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                  <small>
                    Successfully completed orders
                  </small>
                </div>
              </div>

              {/* ACTIVE */}

              <div className="revenue-card">
                <div className="revenue-card-icon active">
                  <Wallet size={21} />
                </div>

                <div className="revenue-card-content">
                  <span>Active Order Value</span>

                  <strong>
                    ₹
                    {Number(
                      stats.activeRevenue || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                  <small>
                    Orders still in progress
                  </small>
                </div>
              </div>

              {/* CANCELLED */}

              <div className="revenue-card">
                <div className="revenue-card-icon cancelled">
                  <Ban size={21} />
                </div>

                <div className="revenue-card-content">
                  <span>Cancelled Value</span>

                  <strong>
                    ₹
                    {Number(
                      stats.cancelledRevenue || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                  <small>
                    Cancelled orders
                  </small>
                </div>
              </div>

            </div>

          </section>

          {/* =========================
              ORDER STATUS
          ========================= */}

          <section className="dashboard-section">

            <div className="section-header">
              <div>
                <h2>Order Status</h2>

                <p>
                  Current order distribution
                </p>
              </div>

              <button
                className="view-all-btn"
                onClick={() =>
                  navigate("/admin/orders")
                }
              >
                Manage Orders
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="order-status-grid">

              <div className="status-summary-card pending-card">
                <div className="status-summary-icon">
                  <Clock3 size={20} />
                </div>

                <div>
                  <span>Pending</span>
                  <strong>
                    {orderStatus.pending}
                  </strong>
                </div>
              </div>

              <div className="status-summary-card accepted-card">
                <div className="status-summary-icon">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <span>Accepted</span>
                  <strong>
                    {orderStatus.accepted}
                  </strong>
                </div>
              </div>

              <div className="status-summary-card preparing-card">
                <div className="status-summary-icon">
                  <ChefHat size={20} />
                </div>

                <div>
                  <span>Preparing</span>
                  <strong>
                    {orderStatus.preparing}
                  </strong>
                </div>
              </div>

              <div className="status-summary-card ready-card">
                <div className="status-summary-icon">
                  <Bike size={20} />
                </div>

                <div>
                  <span>Ready</span>
                  <strong>
                    {orderStatus.ready}
                  </strong>
                </div>
              </div>

              <div className="status-summary-card delivery-card">
                <div className="status-summary-icon">
                  <Bike size={20} />
                </div>

                <div>
                  <span>Out for Delivery</span>
                  <strong>
                    {orderStatus["out for delivery"]}
                  </strong>
                </div>
              </div>

              <div className="status-summary-card delivered-card">
                <div className="status-summary-icon">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <span>Delivered</span>
                  <strong>
                    {orderStatus.delivered}
                  </strong>
                </div>
              </div>

              <div className="status-summary-card cancelled-card">
                <div className="status-summary-icon">
                  <XCircle size={20} />
                </div>

                <div>
                  <span>Cancelled</span>
                  <strong>
                    {orderStatus.cancelled}
                  </strong>
                </div>
              </div>

            </div>

          </section>

          {/* =========================
              RECENT ORDERS
          ========================= */}

          <section className="dashboard-section">

            <div className="section-header">

              <div>
                <h2>Recent Orders</h2>

                <p>
                  Latest customer orders
                </p>
              </div>

              <button
                className="view-all-btn"
                onClick={() =>
                  navigate("/admin/orders")
                }
              >
                View All
                <ArrowRight size={16} />
              </button>

            </div>

            <div className="recent-orders-card">

              {loadingOrders ? (

                <div className="dashboard-loading">
                  Loading orders...
                </div>

              ) : recentOrders.length === 0 ? (

                <div className="dashboard-empty">
                  <ShoppingBag size={32} />

                  <h3>No orders yet</h3>

                  <p>
                    Customer orders will appear here.
                  </p>
                </div>

              ) : (

                <div className="recent-orders-list">

                  {recentOrders.map((order) => (

                    <div
                      className="recent-order-row"
                      key={order.id}
                    >

                      <div className="recent-order-id">
                        <span>Order</span>

                        <strong>
                          #{order.id}
                        </strong>
                      </div>

                      <div className="recent-order-restaurant">
                        <strong>
                          {order.restaurant_name ||
                            "Restaurant"}
                        </strong>

                        <span>
                          {order.order_type ||
                            "Delivery"}
                        </span>
                      </div>

                      <div className="recent-order-total">
                        ₹
                        {Number(
                          order.total_amount || 0
                        ).toFixed(2)}
                      </div>

                      <div
                        className={`recent-order-status status-${(
                          order.status || "pending"
                        )
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {getStatusIcon(
                          order.status
                        )}

                        <span>
                          {formatStatus(
                            order.status
                          )}
                        </span>
                      </div>

                      <div className="recent-order-date">
                        {order.created_at
                          ? new Date(
                              order.created_at
                            ).toLocaleDateString()
                          : "-"}
                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </section>

          {/* =========================
              QUICK ACTIONS
          ========================= */}

          <section className="dashboard-section">

            <div className="section-header">

              <div>
                <h2>Quick Actions</h2>

                <p>
                  Manage your Cravix platform
                </p>
              </div>

            </div>

            <div className="quick-actions">

              <button
                className="quick-action"
                onClick={() =>
                  navigate("/admin/orders")
                }
              >
                <div className="quick-action-icon">
                  <ShoppingBag size={21} />
                </div>

                <div>
                  <strong>
                    Manage Orders
                  </strong>

                  <span>
                    View and update customer
                    orders
                  </span>
                </div>

                <ArrowRight size={18} />
              </button>

              <button
                className="quick-action"
                onClick={() =>
                  navigate(
                    "/admin/restaurants"
                  )
                }
              >
                <div className="quick-action-icon">
                  <Store size={21} />
                </div>

                <div>
                  <strong>
                    Manage Restaurants
                  </strong>

                  <span>
                    Add and manage restaurants
                  </span>
                </div>

                <ArrowRight size={18} />
              </button>

              <button
                className="quick-action"
                onClick={() =>
                  navigate("/admin/menu")
                }
              >
                <div className="quick-action-icon">
                  <ChefHat size={21} />
                </div>

                <div>
                  <strong>
                    Manage Menu
                  </strong>

                  <span>
                    Manage food items and menus
                  </span>
                </div>

                <ArrowRight size={18} />
              </button>

            </div>

          </section>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;