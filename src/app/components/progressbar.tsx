import React, { useState } from "react";

function ProgressBar({ value, max }) {
  const percentage = (value / max) * 100;

  return (
    <div className="progress-bar">
      <div
        className="progress-bar-filled"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
