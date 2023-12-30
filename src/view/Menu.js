import AbstractView from "./AbstractView";

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


export default class Menu extends AbstractView {
  constructor(items) {
    super();
    this._items = items;
  }

  getTemplate() {
    return createMenu(this._items);
  }
}
