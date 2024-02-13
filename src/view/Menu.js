import AbstractView from "./AbstractView";

const createMenu = (menuItems, activeItem) => {
  const getMenuItems = () => {
    return Object.values(menuItems).reduce(function (sum, cur) {
      let activeClass = cur === activeItem ? `trip-tabs__btn--active` : ``;
      return sum + `<a class="trip-tabs__btn ${activeClass}" href="#" data-menu-item="${cur}">${cur}</a>`;
    }, ``);
  };

  return `
      <nav class="trip-controls__trip-tabs  trip-tabs">
      ${getMenuItems()}
      </nav>
    `;
};


export default class Menu extends AbstractView {
  constructor(items, activeItem) {
    super();
    this._items = items;
    this._activeItem = activeItem;
    this._menuItemClickHandler = this._menuItemClickHandler.bind(this);
  }

  getTemplate() {
    return createMenu(this._items, this._activeItem);
  }

  setMenuClickHandler(cb) {
    this._callback.menuItemChange = cb;
    this._menuElements = this.getElement().querySelectorAll(`.trip-tabs a`);
    if (this._menuElements) {
      [...this._menuElements].forEach((menuElement) => {
        menuElement.addEventListener(`click`, this._menuItemClickHandler);
      });
    }
  }

  _menuItemClickHandler(evt) {
    evt.preventDefault();
    const clickedMenuItem = evt.target.getAttribute(`data-menu-item`);
    if (clickedMenuItem !== this._activeItem) {
      this._activeItem = clickedMenuItem;
      this._callback.menuItemChange(clickedMenuItem);
    }
  }
}
