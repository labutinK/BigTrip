import {getDateInFormat, isSameDate} from "../utils/date";
import AbstractView from "./AbstractView";

const createTripInfoTemplate = (points) => {
  if (points.length > 0) {
    let cost = points.reduce(function (sum, current) {
      const curCost = isNaN(parseInt(current.cost, 10)) ? 0 : parseInt(current.cost, 10);
      return parseInt(sum, 10) + curCost;
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
      let startMonthYear = getDateInFormat(points[0].dateStart, `MMM YY`);
      let lastIndex = points.length - 1;
      dates += getDateInFormat(points[0].dateStart, `MMM DD`).toUpperCase();
      if (!isSameDate(points[0].dateStart, points[lastIndex].dateEnd)) {
        dates += ` - `;
        let dateEndFormat = `DD`;
        if (startMonthYear !== getDateInFormat(points[lastIndex].dateEnd, `MMM YY`)) {
          dateEndFormat = `MMM ` + dateEndFormat;
        }
        dates += getDateInFormat(points[lastIndex].dateEnd, dateEndFormat).toUpperCase();
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
  }
  return ``;
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

