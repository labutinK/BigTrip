import AbstractView from "./AbstractView";

const createTripPointsList = () => {
  return `<ul class="trip-events__list"></ul>`;

};


export default class TripList extends AbstractView {
  getTemplate() {
    return createTripPointsList();
  }
}
