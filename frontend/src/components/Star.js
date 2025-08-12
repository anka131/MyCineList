import PropTypes from "prop-types";

Star.propTypes = {
  full: PropTypes.bool,
  onRate: PropTypes.func,
  onHoverIn: PropTypes.func,
  onHoverOut: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default function Star({ full, onRate, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      aria-label={`Rate ${full ? "full" : "empty"} star`}
    >
    {full ? (
  <svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" stroke={color}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.573 4.854a1 1 0 00.95.69h5.104c.969 0 1.371 1.24.588 1.81l-4.13 3a1 1 0 00-.364 1.118l1.573 4.854c.3.921-.755 1.688-1.538 1.118l-4.13-3a1 1 0 00-1.176 0l-4.13 3c-.783.57-1.838-.197-1.538-1.118l1.573-4.854a1 1 0 00-.364-1.118l-4.13-3c-.783-.57-.38-1.81.588-1.81h5.104a1 1 0 00.95-.69l1.573-4.854z"
    />
  </svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.573 4.854a1 1 0 00.95.69h5.104c.969 0 1.371 1.24.588 1.81l-4.13 3a1 1 0 00-.364 1.118l1.573 4.854c.3.921-.755 1.688-1.538 1.118l-4.13-3a1 1 0 00-1.176 0l-4.13 3c-.783.57-1.838-.197-1.538-1.118l1.573-4.854a1 1 0 00-.364-1.118l-4.13-3c-.783-.57-.38-1.81.588-1.81h5.104a1 1 0 00.95-.69l1.573-4.854z"
    />
  </svg>
)}

    </span>
  );
}
