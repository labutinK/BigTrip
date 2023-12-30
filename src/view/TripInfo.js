import {displayDate, isSameDate} from "../utils";
import AbstractView from "./AbstractView";

const createTripInfoTemplate = (points) => {
  let cost = points.reduce(function (sum, current) {
    return sum + current.cost;
  }, 0);

  let tempTown = ``;
  let route = points.reduce(function (sum, current) {
    if (current.town !== tempTown) {
      let str = ``;
      if (sum !== ``) {
        str += ` - `;
      }
      str += current.town;
      tempTown = current.town;
      return sum + str;
    }
    return sum;
  }, ``);


  let dates = ``;
  if (points[0].dateStart) {
    let startMonthYear = displayDate(points[0].dateStart, `MMM YY`);
    let lastIndex = points.length - 1;
    dates += displayDate(points[0].dateStart, `MMM DD`).toUpperCase();
    if (!isSameDate(points[0].dateStart, points[lastIndex].dateEnd)) {
      dates += ` - `;
      let dateEndFormat = `DD`;
      if (startMonthYear !== displayDate(points[lastIndex].dateEnd, `MMM YY`)) {
        dateEndFormat = `MMM ` + dateEndFormat;
      }
      dates += displayDate(points[lastIndex].dateEnd, dateEndFormat).toUpperCase();
    }
  }

  return `
    <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${route}</h1>

              <p class="trip-info__dates">${dates}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>
          </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._point = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._point);
  }
}

