import {generatePoint} from "./mock/point";
import dayjs from "dayjs";
import Trip from "./presenter/Trip";


const POINTS_COUNT = 15;


let points = new Array(POINTS_COUNT).fill().map(() => generatePoint()).sort(function (a, b) {
  return dayjs(b.dateStart).isBefore(a.dateStart, `minute`);
});

let TripPresenter = new Trip();

TripPresenter.init(points);
