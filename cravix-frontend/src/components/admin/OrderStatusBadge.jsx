import "./OrderStatusBadge.css";

function OrderStatusBadge({ status }) {
  return (
    <span
      className={`status-badge ${status
        .toLowerCase()
        .replace(/\s/g, "-")}`}
    >
      {status}
    </span>
  );
}

export default OrderStatusBadge;