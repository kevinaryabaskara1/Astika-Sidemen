import classNames from "classnames";

export function Button({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "md",
  type = "button",
  disabled = false,
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        baseStyles,
        variants[variant] || variants.default,
        sizes[size] || sizes.md,
        className
      )}
    >
      {children}
    </button>
  );
}
