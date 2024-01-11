import {generatePoint} from "./mock/point";
import Trip from "./presenter/Trip";
import Points from "./model/Points";
import FilterModel from "./model/Filter";
import FiltersPresenter from './presenter/Filters';
import {FilterType} from './const';
import Statistic from "./view/Statistic";
import {DOM_POSITIONS, renderElement} from "./utils/render";
import MenuPresenter from './presenter/Menu';

let htmlWrapper = document.querySelector(`.page-body`);
let headerFilterWrapper = document.querySelector(`.trip-controls__filters`);

const POINTS_COUNT = 5;

let points = new Array(POINTS_COUNT).fill().map(() => generatePoint());

let filtersModel = new FilterModel();
let FilterPresenter = new FiltersPresenter(headerFilterWrapper, FilterType, filtersModel);


let PointsModel = new Points();
PointsModel.setPoints(points);

const TripPresenter = new Trip(htmlWrapper, PointsModel, filtersModel);

const StatisticView = new Statistic();
renderElement(TripPresenter.contentWrapper, StatisticView.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);


new MenuPresenter(TripPresenter, StatisticView, FilterPresenter);
