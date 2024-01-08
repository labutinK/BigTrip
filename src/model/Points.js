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

  updatePoint(updateItem) {
    const index = this._points.findIndex((item) => item.id === updateItem.id);

    if (index === -1) {
      return this._points;
    }

    return [
      ...this._points.slice(0, index),
      updateItem,
      ...this._points.slice(index + 1),
    ];
  }
}
