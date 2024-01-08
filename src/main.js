import {generatePoint} from "./mock/point";
import Trip from "./presenter/Trip";
import Points from "./model/Points";

let htmlWrapper = document.querySelector(`.page-body`);


const POINTS_COUNT = 2;

let points = new Array(POINTS_COUNT).fill().map(() => generatePoint());

let PointsModel = new Points();
PointsModel.setPoints(points);

let TripPresenter = new Trip(htmlWrapper, PointsModel);
