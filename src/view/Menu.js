import {createElement} from "../utils";

const createMenu = (menuItems) => {
  const getMenuItems = () => {
    return menuItems.reduce(function (sum, cur) {
      let activeClass = cur.checked ? `trip-tabs__btn--active` : ``;
      return sum + `<a class="trip-tabs__btn ${activeClass}" href="${cur.href}">${cur.label}</a>`;
    }, ``);
  };

  return `
      <nav class="trip-controls__trip-tabs  trip-tabs">
      ${getMenuItems()}
      </nav>
    `;
};


export default class Menu {
  constructor(items) {
    this._element = null;
    this._items = items;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(createMenu(this._items));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
