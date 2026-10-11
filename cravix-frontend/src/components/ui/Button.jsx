function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300 focus:outline-none";

  const variants = {
    primary:
      "bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5 shadow-lg",

    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200",

    outline:
      "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white",

    danger:
      "bg-red-700 text-white hover:bg-red-800",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;