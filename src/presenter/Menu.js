import MenuView from "../view/Menu";
import {DOM_POSITIONS, renderElement, replace} from "../utils/render";

const HIDE_CLASS = `visually-hidden`;

const menuItems = {
  TABEL: `TABEL`,
  STATS: `STATS`
};

export default class Menu {

  constructor(TripItem, StatisticItem, filterPresenter) {
    this._menuWrapper = document.querySelector(`.trip-controls__navigation`);
    this._addNewBtn = document.querySelector(`.trip-main__event-add-btn`);

    this._menuView = new MenuView(menuItems, menuItems.TABEL);
    this._changeMenuItemHandler = this._changeMenuItemHandler.bind(this);
    this._menuView.setMenuClickHandler(this._changeMenuItemHandler);
    this._activeMenuItem = menuItems.TABEL;
    this._tripMenuItem = TripItem;
    this._filterPresenter = filterPresenter;
    this._statisticMenuItem = StatisticItem;
    this._renderMenu();
    this._renderContent();
  }

  _changeMenuItemHandler(activeItem) {
    this._activeMenuItem = activeItem;
    this._renderContent();
    this._renderNewMenu();
  }

  _renderNewMenu() {
    const oldMenu = this._menuView;
    this._menuView = new MenuView(menuItems, this._activeMenuItem);
    this._menuView.setMenuClickHandler(this._changeMenuItemHandler);
    replace(this._menuView.getElement(), oldMenu.getElement());
  }

  _renderMenu() {
    renderElement(this._menuWrapper, this._menuView.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
  }

  _renderContent() {
    switch (this._activeMenuItem) {
      case menuItems.STATS:
        this._tripMenuItem.hide();
        this._tripMenuItem.resetToDefault();
        this._statisticMenuItem.show();
        this._filterPresenter.hide();
        this._addNewBtn.classList.add(HIDE_CLASS);
        break;
      case menuItems.TABEL:
        this._statisticMenuItem.hide();
        this._tripMenuItem.show();
        this._filterPresenter.show();
        this._addNewBtn.classList.remove(HIDE_CLASS);
        break;
    }
  }

}
