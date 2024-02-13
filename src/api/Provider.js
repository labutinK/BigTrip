import PointsModel from './../model/Points.js';
import {isOnline} from '../utils/common';

const createStoreStructure = (storeItems) => {
  return storeItems.reduce((accumulator, current) => {
    return Object.assign(
        {},
        accumulator,
        {
          [current.id]: current,
        }
    );
  }, {});
};


const getSyncedPoints = (items) => {
  return items.filter(({success}) => success).map(({payload}) => payload.point);
};


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._api.getPoints().then((points) => {
        const storeItems = createStoreStructure(points);
        this._store.setItems(storeItems);
        return points;
      });
    }
    const storePoints = Object.values(this._store.getItems());
    return Promise.resolve(storePoints.map(PointsModel.adaptPointToClient));
  }

  getOffers() {
    if (isOnline()) {
      return this._api.getOffers().then((items) => {
        this._store.setItems(items);
        return items;
      });
    }
    const storeItems = this._store.getItems();
    return Promise.resolve(storeItems);
  }

  getDestinations() {
    if (isOnline()) {
      return this._api.getDestinations().then((items) => {
        this._store.setItems(items);
        return items;
      });
    }
    const storeItems = this._store.getItems();
    return Promise.resolve(storeItems);
  }

  updatePoint(pointId, point) {
    if (isOnline()) {
      return this._api.updatePoint(pointId, point).then((updatedPoint) => {
        this._store.setItem(pointId, updatedPoint);
        return updatedPoint;
      });
    }
    this._store.setItem(pointId, PointsModel.adaptClientToPoint(point));
    return Promise.resolve(point);
  }


  addPoint(point) {
    if (isOnline()) {
      return this._api.addPoint(point).then((newPoint) => {
        this._store.setItem(newPoint.id, newPoint);
        return newPoint;
      });
    }
    return Promise.reject(new Error(`Operation failed`));
  }


  deletePoint(point) {
    if (isOnline()) {
      return this._api.deletePoint(point).then(() => this._store.removeItem(point.id));
    }
    return Promise.reject(new Error(`Operation failed`));
  }


  sync() {
    if (isOnline()) {
      const storePoints = Object.values(this._store.getItems());
      return this._api.sync(storePoints).then((response) => {
        const createdPoints = getSyncedPoints(response.created);
        const updatedPoints = getSyncedPoints(response.updated);
        const items = createStoreStructure([...createdPoints, ...updatedPoints]);
        this._store.setItems(items);
      });
    }
    return Promise.reject(new Error(`Operation failed`));
  }
}
