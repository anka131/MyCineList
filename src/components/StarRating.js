import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./StarRating.module.css";
import Star from "./Star";

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    onSetRating?.(value);
  };

  const displayedValue = tempRating || rating;
  const displayText =
    messages.length === maxRating
      ? messages[displayedValue - 1] || ""
      : displayedValue || "";

  return (
    <div className={styles.container}>
      <div className={styles.stars}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={displayedValue >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p className={styles.text} style={{ color, fontSize: `${size / 1.5}px` }}>
        {displayText}
      </p>
    </div>
  );
}
