import Points from "./model/Points";

const METHODS = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const ESSENCE = {
  POINTS: `points/`,
  OFFERS: `offers/`,
  DESTINATION: `destinations/`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};
export default class Api {

  constructor(endPoint, authData) {
    this._endPoint = endPoint;
    this._authData = authData;
  }

  _load({
    url,
    method = METHODS.GET,
    headers = new Headers(),
  }) {
    headers.append(`Authorization`, this._authData);
    return fetch(this._endPoint + url, {method, headers}).then(Api.checkStatus)
            .catch(Api.catchError);
  }

  getOffers() {
    return this._load({url: ESSENCE.OFFERS}).then(Api.toJSON);
  }

  updatePoint(pointId, pointData) {
    const url = this._endPoint + ESSENCE.POINTS + pointId;
    const method = METHODS.PUT;
    const body = JSON.stringify(Points.adaptClientToPoint(pointData));
    let headers = new Headers();
    headers.append(`Authorization`, this._authData);
    headers.append(`Content-Type`, `application/json`);
    return fetch(url, {method, body, headers}).then(Api.toJSON).then(Points.adaptPointToClient);
  }

  createPoint(pointData) {
    const url = this._endPoint + ESSENCE.POINTS;
    const method = METHODS.POST;
    const body = JSON.stringify(Points.adaptClientToPoint(pointData));
    let headers = new Headers();
    headers.append(`Authorization`, this._authData);
    headers.append(`Content-Type`, `application/json`);
    return fetch(url, {method, body, headers}).then(Api.checkStatus).then(Api.toJSON).then(Points.adaptPointToClient);
  }

  deletePoint(id) {
    const url = this._endPoint + ESSENCE.POINTS + id;
    const method = METHODS.DELETE;
    const body = `OK`;
    let headers = new Headers();
    headers.append(`Authorization`, this._authData);
    headers.append(`Content-Type`, `text`);
    return fetch(url, {method, body, headers}).then(Api.checkStatus);
  }


  getPoints() {
    return this._load({url: ESSENCE.POINTS}).then(Api.toJSON)
        .then((jsonPoints) => jsonPoints.map((jsonPoint) => Points.adaptPointToClient(jsonPoint)));
  }

  getDestinations() {
    return this._load({url: ESSENCE.DESTINATION}).then(Api.toJSON);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
            response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }


  static jsonToObj(json) {
    return JSON.parse(json);
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw new Error(err);
  }
}
