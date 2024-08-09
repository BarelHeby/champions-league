import React from "react";
import loading from "./loading.gif";
function Loading() {
  return (
    <div className="p-3 fade-in-slow ">
      <img src={loading} width={150} height={150} alt="loading" />
    </div>
  );
}

export default Loading;
