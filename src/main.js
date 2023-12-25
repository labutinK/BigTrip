import {createTripInfo} from "./view/TripInfo";
import {createMenu} from "./view/Menu";
import {createFilters} from "./view/Filters";
import {createSorts} from "./view/Sort";
import {createTripPointsList} from "./view/TripPointLists";
import {generatePoint} from "./mock/point";
import './mock/point';
import {filters, menuItems} from "./mock/consts";
import dayjs from "dayjs";

const POINTS_COUNT = 15;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteBodyElement.querySelector(`.page-header`);
const headerTripWrapper = siteHeaderElement.querySelector(`.trip-main`);
const headerNavWrapper = siteHeaderElement.querySelector(`.trip-controls__navigation`);
const headerFiltersWrapper = siteHeaderElement.querySelector(`.trip-controls__filters`);
const contentWrapper = siteBodyElement.querySelector(`.trip-events`);


let points = new Array(POINTS_COUNT).fill().map(() => generatePoint()).sort(function (a, b) {
  return dayjs(b.dateStart).isBefore(a.dateStart, `minute`);
});

render(headerTripWrapper, createTripInfo(points), `afterbegin`);
render(headerNavWrapper, createMenu(menuItems), `beforeend`);
render(headerFiltersWrapper, createFilters(filters), `beforeend`);


render(contentWrapper, createTripPointsList(points, true), `afterbegin`);
render(contentWrapper, createSorts(), `afterbegin`);

