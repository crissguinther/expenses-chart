const fetchData = async (weekdays) => {
  const data = await fetch("../data.json");
  const text = await data.json();
  for (const entry of text) {
    for (const day of weekdays) {
      if (day.getAttribute("data-weekday") === entry.day)
        day.previousElementSibling.style.height = `${entry.amount * 3.3}px`;
    }
  }
  return text;
};

export default fetchData;
