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
        <svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 20 20" stroke={color}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0..." />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="..." />
        </svg>
      )}
    </span>
  );
}
