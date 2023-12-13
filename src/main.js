import {createTripInfo} from "./view/TripInfo";
import {createMenu} from "./view/Menu";
import {createFilters} from "./view/Filters";
import {createSorts} from "./view/Sort";
import {createTripPointsList} from "./view/TripPointLists";

const POINTS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`.page-body`);
const siteHeaderElement = siteBodyElement.querySelector(`.page-header`);
const headerTripWrapper = siteHeaderElement.querySelector(`.trip-main`);
const headerNavWrapper = siteHeaderElement.querySelector(`.trip-controls__navigation`);
const headerFiltersWrapper = siteHeaderElement.querySelector(`.trip-controls__filters`);
const contentWrapper = siteBodyElement.querySelector(`.trip-events`);

render(headerTripWrapper, createTripInfo(), `afterbegin`);
render(headerNavWrapper, createMenu(), `beforeend`);
render(headerFiltersWrapper, createFilters(), `beforeend`);


render(contentWrapper, createSorts(), `afterbegin`);


render(contentWrapper, createTripPointsList(POINTS_COUNT), `afterbegin`);
