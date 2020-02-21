import React from "react";

const ErrorMessage = () => {
  const errorMessageStyle = {
    position: `absolute`,
    top: `50vh`,
    left: `50%`,
    margin: `0`,

    fontSize: `60px`,
    color: `red`,

    transform: `translateX(-50%) translateY(-50%)`,
  };

  return (
    <h1 style={errorMessageStyle}>Film not found!</h1>
  );
};

export default ErrorMessage;
