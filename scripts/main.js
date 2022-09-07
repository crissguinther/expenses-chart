import "../styles/style.css";
import "regenerator-runtime/runtime.js";
import "core-js/actual";

import HoverWindow from "./modules/HoverWindow.js";
import fetchData from "./modules/fetchData.js";

let weekdays = document.querySelectorAll("[data-weekday]");

const setChart = async () => {
  const data = await fetchData(weekdays);
  const highest = data.reduce((acc, day, index) => {
    if (day.amount > acc.amount) acc = { ...day };
    return acc;
  });
  const day = [].find.call(weekdays, (el) => el.innerHTML === highest.day);
  day.previousElementSibling.style.backgroundColor = "hsl(186, 34%, 60%)";
};

const hoverWindow = new HoverWindow("#my-spending", "chart", weekdays);
hoverWindow.init();
setChart();
