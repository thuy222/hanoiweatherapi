import React from "react";
import "./index.css";

type Props = {
  isLoading: boolean;
};

const LoadingOverlay = ({ isLoading }: Props) => {
  return (
    isLoading && (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  );
};

export default LoadingOverlay;
