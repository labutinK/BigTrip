import {generatePoint} from "./mock/point";
import Trip from "./presenter/Trip";
import Points from "./model/Points";
import FilterModel from "./model/Filter";
import FiltersPresenter from './presenter/Filters';
import {FilterType} from './const';

let htmlWrapper = document.querySelector(`.page-body`);
let headerFilterWrapper = document.querySelector(`.trip-controls__filters`);

const POINTS_COUNT = 5;

let points = new Array(POINTS_COUNT).fill().map(() => generatePoint());

let filtersModel = new FilterModel();
new FiltersPresenter(headerFilterWrapper, FilterType, filtersModel);


let PointsModel = new Points();
PointsModel.setPoints(points);

new Trip(htmlWrapper, PointsModel, filtersModel);
