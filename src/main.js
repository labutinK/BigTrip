import Menu from "./view/Menu";
import Filters from "./view/Filters";
import Sorts from "./view/Sort";
import {generatePoint} from "./mock/point";
import {filters, menuItems} from "./mock/consts";
import dayjs from "dayjs";
import TripList from "./view/TripList";
import {createPoint} from "./view/createPoint";
import {renderElement, DOM_POSITIONS} from "./utils";
import TripInfoView from "./view/TripInfo";
import EmptyList from "./view/EmptyList";


const POINTS_COUNT = 15;

const siteBodyElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteBodyElement.querySelector(`.page-header`);
const headerTripWrapper = siteHeaderElement.querySelector(`.trip-main`);
const headerNavWrapper = siteHeaderElement.querySelector(`.trip-controls__navigation`);
const headerFiltersWrapper = siteHeaderElement.querySelector(`.trip-controls__filters`);
const contentWrapper = siteBodyElement.querySelector(`.trip-events`);


let points = new Array(POINTS_COUNT).fill().map(() => generatePoint()).sort(function (a, b) {
  return dayjs(b.dateStart).isBefore(a.dateStart, `minute`);
});

const createBoard = (pointsData) => {

  if (pointsData.length > 0) {
    renderElement(headerTripWrapper, (new TripInfoView(pointsData)).getElement(), DOM_POSITIONS[`AFTERBEGIN`]);

    renderElement(contentWrapper, (new Sorts()).getElement(), DOM_POSITIONS[`AFTERBEGIN`]);

    const tripListElement = new TripList();
    renderElement(contentWrapper, tripListElement.getElement(), DOM_POSITIONS[`BEFOREEND`]);
    pointsData.forEach((point) => {
      createPoint(tripListElement.getElement(), point);
    });
  } else {
    renderElement(contentWrapper, new EmptyList().getElement(), DOM_POSITIONS[`AFTERBEGIN`]);
  }
  renderElement(headerFiltersWrapper, (new Filters(filters)).getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
  renderElement(headerNavWrapper, (new Menu(menuItems)).getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
};

createBoard(points);
