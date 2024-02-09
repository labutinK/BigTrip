import Observer from "./Observer";
import {getDateInFormat, getDayjsObjInFormat} from "../utils/date";
export default class Points extends Observer {
  constructor() {
    super();
  }

  setPoints(updateType, points) {
    this._points = points;
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  static adaptPointToClient(pointServer) {
    let pointClient = Object.assign(
        {},
        pointServer,
        {
          dateStart: getDayjsObjInFormat(pointServer.date_from),
          dateEnd: getDayjsObjInFormat(pointServer.date_to),
          isFavorite: pointServer.is_favorite,
          cost: pointServer.base_price,
          town: ``,
        }
    );

    if (pointServer.destination && pointServer.destination.name) {
      pointClient.town = pointServer.destination.name;
    }

    if (pointClient.offers.length > 0) {
      pointClient.offers = pointClient.offers.map(({title, price}) => {
        return {name: title, cost: price, formName: title};
      });
    }

    delete pointClient.date_from;
    delete pointClient.date_to;
    delete pointClient.is_favorite;
    delete pointClient.base_price;

    return pointClient;
  }

  static adaptClientToPoint(pointClient) {
    const pointServer = Object.assign(
        {},
        pointClient,
        {
          'date_from': getDateInFormat(pointClient.dateStart, `YYYY-MM-DDTHH:mm:ss.SSS[Z]`),
          'date_to': getDateInFormat(pointClient.dateEnd, `YYYY-MM-DDTHH:mm:ss.SSS[Z]`),
          'is_favorite': pointClient.isFavorite,
          'base_price': parseInt(pointClient.cost, 10),
        }
    );

    if (pointServer.offers.length > 0) {
      pointServer.offers = pointServer.offers.map(({name, cost}) => {
        return {title: name, price: cost};
      });
    }

    delete pointServer.dateStart;
    delete pointServer.town;
    delete pointServer.dateEnd;
    delete pointServer.isFavorite;
    delete pointServer.cost;

    return pointServer;
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

  createPoint(updateType, newItem) {
    if (Object.keys(newItem).length === 0) {
      return this._points;
    }

    this._points.push(newItem);

    this._notify(updateType, newItem);
  }

  // eslint-disable-next-line consistent-return
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
