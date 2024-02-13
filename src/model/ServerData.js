export default class ServerData {
  constructor() {
    this._offers = new Map();
    this._pointTypes = [];
    this._destinations = new Map();
    this._towns = [];
  }

  set offers(offers) {
    this._offers = offers;
  }

  get offers() {
    return this._offers;
  }

  set pointTypes(pointTypes) {
    this._pointTypes = pointTypes;
  }

  get pointTypes() {
    return this._pointTypes;
  }

  set destinations(destinations) {
    this._destinations = destinations;
  }

  get destinations() {
    return this._destinations;
  }

  set towns(towns) {
    this._towns = towns;
  }

  get towns() {
    return this._towns;
  }
}
