import Observer from "./Observer";
export default class Points extends Observer {
  constructor() {
    super();
  }

  setPoints(points) {
    this._points = points;
  }

  getPoints() {
    return this._points;
  }

  // eslint-disable-next-line consistent-return
  updatePoint(updateType, updateItem) {
    const index = this._points.findIndex((item) => item.id === updateItem.id);

    if (index === -1) {
      return this._points;
    }


    this._points = [
      ...this._points.slice(0, index),
      updateItem,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, updateItem);
  }


  deletePoint(updateType, deleteItem) {
    const index = this._points.findIndex((item) => item.id === deleteItem.id);

    if (index === -1) {
      return this._points;
    }


    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, deleteItem);
  }
}
