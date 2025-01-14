import React from "react";
import "./neon.css";

interface NeonProps {
  className?: string;
}

const Neon: React.FC<NeonProps> = ({ className }) => {
  return (
    <a
      href="#"
      className={`btn-neon ${className}`}
    ></a>
  );
};

export default Neon;
