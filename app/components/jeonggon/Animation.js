import React, { useEffect } from "react";
import "./jeonggon.css"; // Import the CSS file for styles

const HeartAnimation = () => {
  const colors = [
    "#ec2d73", // red
    "#eb5324", // orange
    "#fdc800", // yellow
    "#47b264", // green
    "#1470bd", // blue
    "#76469a", // purple
    "#ec2d73", // red
    "#eb5324", // orange
    "#fdc800", // yellow
  ];

  return (
    <div class="center_div">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
    </div>
  );
};

export default HeartAnimation;
