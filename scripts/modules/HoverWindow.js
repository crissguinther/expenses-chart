import fetchData from "./fetchData.js";

export default class HoverWindow {
  constructor(element, dataAttribute, weekdays) {
    this.element = document.querySelector(element);
    this.makeRelative();
    this.dataAttribute = dataAttribute;
    this.weekdays = weekdays;
  }

  // Make element relative if is not
  makeRelative() {
    if (this.element.style.position !== "relative" || this.element.style.position !== "absolute")
      this.element.style.position = "relative";
  }

  async addEventListeners() {
    const data = await fetchData(this.weekdays);
    const dataset = `data-${this.dataAttribute}`;
    this.element.addEventListener("mousemove", (e) => {
      const position = e.target.getBoundingClientRect();
      if (!e.target.getAttribute(dataset)) return;
      if (this.windowBox) this.destroyWindowBox();
      this.createWindowBox(position.top, position.left, data[e.target.getAttribute(dataset)].amount);
    });
    this.element.addEventListener("mouseleave", (e) => this.destroyWindowBox());
  }

  // Cria janela
  createWindowBox(positionTop, positionLeft, value) {
    this.windowBox = document.createElement("div");
    this.windowBox.innerText = `$${value}`;
    this.windowBox.classList.add("window-box");
    this.windowBox.style.top = `${positionTop}px`;
    this.windowBox.style.left = `${positionLeft + 5}px`;
    document.body.appendChild(this.windowBox);
  }

  // Destroi janela
  destroyWindowBox() {
    this.windowBox.remove();
    this.windowBox = undefined;
  }

  // Inicia a classe
  init() {
    this.addEventListeners();
  }
}
