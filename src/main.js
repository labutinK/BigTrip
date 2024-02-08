import Trip from "./presenter/Trip";
import Points from "./model/Points";
import FilterModel from "./model/Filter";
import FiltersPresenter from './presenter/Filters';
import {FilterType} from './const';
import MenuPresenter from './presenter/Menu';
import StatisticPresenter from './presenter/Statistic';
import {UpdateType} from "./const";
import Api from "./Api";
import ServerData from "./model/ServerData";

let htmlWrapper = document.querySelector(`.page-body`);
let headerFilterWrapper = document.querySelector(`.trip-controls__filters`);

let filtersModel = new FilterModel();
let PointsModel = new Points();

const ApiClass = new Api(`https://14.ecmascript.htmlacademy.pro/big-trip/`, `Basic fskdDASl%)ds$tg`);

let servData = new ServerData();
Promise.all([ApiClass.getOffers(), ApiClass.getDestinations()]).then(([offers, destinations]) => {
  let servOffers = new Map();
  let servPointTypes = [];

  offers.forEach((offerServer) => {
    let clientOffers = offerServer.offers.map(({title, price}) => {
      return {name: title, cost: price, formName: title};
    });
    servPointTypes.push(offerServer.type);
    servOffers.set(offerServer.type, clientOffers);
  });

  servData.pointTypes = servPointTypes;
  servData.offers = servOffers;

  let servDestinations = new Map();
  let servTowns = [];

  destinations.forEach((destination) => {
    let destinationInfo = {
      name: destination.name,
      description: destination.description,
      pictures: destination.pictures
    };
    servDestinations.set(destination.name, destinationInfo);
    servTowns.push(destination.name);
  });

  servData.destinations = servDestinations;
  servData.towns = servTowns;
  return servData;

}).then((serverData) => {
  const TripPresenter = new Trip(htmlWrapper, PointsModel, filtersModel, serverData, ApiClass);

  ApiClass.getPoints().then((points) => {
    PointsModel.setPoints(UpdateType.INIT, points);
    let FilterPresenter = new FiltersPresenter(headerFilterWrapper, FilterType, filtersModel);
    const StatsPresenter = new StatisticPresenter(TripPresenter, PointsModel);

    new MenuPresenter(TripPresenter, StatsPresenter, FilterPresenter);
  });
});


