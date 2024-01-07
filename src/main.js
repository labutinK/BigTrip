import {generatePoint} from "./mock/point";
import Trip from "./presenter/Trip";

const POINTS_COUNT = 2;

let points = new Array(POINTS_COUNT).fill().map(() => generatePoint());

let htmlWrapper = document.querySelector(`.page-body`);
let TripPresenter = new Trip(htmlWrapper);

TripPresenter.init(points);
