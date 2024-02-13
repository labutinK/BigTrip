import Points from "../model/Points";

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
  SYNC: `/points/sync`
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
    body = null,
  }) {
    headers.append(`Authorization`, this._authData);
    return fetch(this._endPoint + url, {method, headers, body}).then(Api.checkStatus)
        .catch(Api.catchError);
  }

  getOffers() {
    return this._load({url: ESSENCE.OFFERS}).then(Api.toJSON);
  }

  updatePoint(pointId, pointData) {
    let headers = new Headers();
    headers.append(`Content-Type`, `application/json`);
    return this._load({
      url: ESSENCE.POINTS + pointId,
      method: METHODS.PUT,
      body: JSON.stringify(Points.adaptClientToPoint(pointData)),
      headers,
    }).then(Api.toJSON).then(Points.adaptPointToClient);
  }

  createPoint(pointData) {
    let headers = new Headers();
    headers.append(`Content-Type`, `application/json`);
    return this._load({
      url: ESSENCE.POINTS,
      method: METHODS.POST,
      body: JSON.stringify(Points.adaptClientToPoint(pointData)),
      headers,
    }).then(Api.toJSON).then(Points.adaptPointToClient);
  }

  deletePoint(id) {
    let headers = new Headers();
    headers.append(`Content-Type`, `text`);
    return this._load({
      url: ESSENCE.POINTS + id,
      method: METHODS.DELETE,
      body: `OK`,
      headers
    });
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

  sync(data) {
    return this._load({
      url: ESSENCE.SYNC,
      method: METHODS.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`}),
    })
        .then(Api.toJSON);
  }

}
