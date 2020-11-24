import React from "react";

export default function CustomButton({
  children,
  isGoogleSignIn,
  inverted,
  soldOut,
  wide = true,
  isLoading = false,
  ...props
}) {
  const googleStyle = `${isGoogleSignIn ? "google-sign-in" : ""}`;
  const invertedStyle = `${inverted ? "inverted" : ""}`;
  const soldOutStyle = `${soldOut ? "sold-out" : ""}`;
  const wideStyle = `${wide ? "wide" : ""}`;

  return (
    <button
      className={`${googleStyle} ${invertedStyle} ${soldOutStyle} ${wideStyle} custom-button`}
      {...props}
      disabled={soldOut}
    >
      {isLoading ? (
        <div className="spinner-button-overlay">
          <div className="spinner-button-container"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
