import {generatePoint} from "./mock/point";
import Trip from "./presenter/Trip";
import Points from "./model/Points";
import FilterModel from "./model/Filter";
import FiltersPresenter from './presenter/Filters';
import {FilterType} from './const';
import MenuPresenter from './presenter/Menu';
import StatisticPresenter from './presenter/Statistic';

let htmlWrapper = document.querySelector(`.page-body`);
let headerFilterWrapper = document.querySelector(`.trip-controls__filters`);

const POINTS_COUNT = 10;

let points = new Array(POINTS_COUNT).fill().map(() => generatePoint());
let PointsModel = new Points();
PointsModel.setPoints(points);

let filtersModel = new FilterModel();
let FilterPresenter = new FiltersPresenter(headerFilterWrapper, FilterType, filtersModel);

const TripPresenter = new Trip(htmlWrapper, PointsModel, filtersModel);
const StatsPresenter = new StatisticPresenter(TripPresenter, PointsModel);

new MenuPresenter(TripPresenter, StatsPresenter, FilterPresenter);
