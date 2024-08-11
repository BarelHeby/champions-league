import React from "react";
import loading from "./loading.gif";
import champions_league_cup from "./champions_league_cup.png";
function Loading({ style }) {
  if (style === "loading") {
    return (
      <div className="p-3    ">
        <img src={loading} width={150} height={150} alt="loading" />
      </div>
    );
  }
  return (
    <div className="p-3  rotate  ">
      <img src={champions_league_cup} width={300} height={300} alt="loading" />
    </div>
  );
}

export default Loading;
