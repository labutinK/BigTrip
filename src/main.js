import Trip from "./presenter/Trip";
import Points from "./model/Points";
import FilterModel from "./model/Filter";
import FiltersPresenter from './presenter/Filters';
import {FilterType} from './const';
import MenuPresenter from './presenter/Menu';
import StatisticPresenter from './presenter/Statistic';
import {UpdateType} from "./const";
import Api from "./api/Api";
import ServerData from "./model/ServerData";
import Store from "./api/Store";
import Provider from "./api/Provider";
import {toastPermanent, toastRemove} from "./utils/toast";
import {isOnline} from "./utils/common";


const STORE_VERSION = `v2`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VERSION}`;
const STORE_OFFER_PREFIX = `bigtrip-offer-localstorage`;
const STORE_OFFER_NAME = `${STORE_OFFER_PREFIX}-${STORE_VERSION}`;
const STORE_DESTINATION_PREFIX = `bigtrip-destination-localstorage`;
const STORE_DESTINATION_NAME = `${STORE_DESTINATION_PREFIX}-${STORE_VERSION}`;

let htmlWrapper = document.querySelector(`.page-body`);
let headerFilterWrapper = document.querySelector(`.trip-controls__filters`);

let filtersModel = new FilterModel();
let PointsModel = new Points();

const ApiClass = new Api(`https://14.ecmascript.htmlacademy.pro/big-trip/`, `Basic fskdDASl%)ds$tg`);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(ApiClass, store);
const storeOffer = new Store(STORE_OFFER_NAME, window.localStorage);
const apiWithProviderOffer = new Provider(ApiClass, storeOffer);
const storeDestination = new Store(STORE_DESTINATION_NAME, window.localStorage);
const apiWithProviderDestination = new Provider(ApiClass, storeDestination);


let servData = new ServerData();
Promise.all([apiWithProviderOffer.getOffers(), apiWithProviderDestination.getDestinations()]).then(([offers, destinations]) => {
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
  const TripPresenter = new Trip(htmlWrapper, PointsModel, filtersModel, serverData, apiWithProvider);

  apiWithProvider.getPoints().then((points) => {
    PointsModel.setPoints(UpdateType.INIT, points);
    let FilterPresenter = new FiltersPresenter(headerFilterWrapper, FilterType, filtersModel);
    const StatsPresenter = new StatisticPresenter(TripPresenter, PointsModel);

    new MenuPresenter(TripPresenter, StatsPresenter, FilterPresenter);
  });
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
  if (!isOnline()) {
    toastPermanent();
  }
});


window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
  toastRemove();
});


window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
  console.log(`123`);
  toastPermanent();
});
