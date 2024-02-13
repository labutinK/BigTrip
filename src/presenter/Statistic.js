import {DOM_POSITIONS, renderElement, replace} from "../utils/render";
import StatisticView from "../view/Statistic";
import {getDateDiffInMinutes} from "../utils/date";

export default class Statistic {
  constructor(tripPresenter, pointsModel) {
    this._updateStatistic = this._updateStatistic.bind(this);
    this._pointsModel = pointsModel;
    this._tripPresenter = tripPresenter;
    this._statView = new StatisticView(this._getMoneyStatistic(), this._getTypeStatistic(), this._getTimeStatistic());
    renderElement(this._tripPresenter.contentWrapper, this._statView.getElement(), DOM_POSITIONS[`BEFOREBEGIN`]);
    this._pointsModel.addObserver(this._updateStatistic);
  }

  _updateStatistic() {
    const oldElement = this._statView;
    this._statView = new StatisticView(this._getMoneyStatistic(), this._getTypeStatistic(), this._getTimeStatistic());
    this.hide();
    replace(this._statView.getElement(), oldElement.getElement());
  }

  _getMoneyStatistic() {
    let moneyStatistic = {};
    this._pointsModel.getPoints().forEach(({type, cost, offers}) => {
      let offersCost = 0;
      if (offers && offers.length > 0) {
        offersCost = offers.reduce(function (offersSum, cur) {
          const curOfferCost = isNaN(parseInt(cur.cost, 10)) ? 0 : parseInt(cur.cost, 10);
          return parseInt(offersSum, 10) + curOfferCost;
        }, 0);
      }
      let curCost = isNaN(parseInt(cost, 10)) ? 0 : parseInt(cost, 10);
      moneyStatistic[type] = isNaN(parseInt(moneyStatistic[type], 10)) ? 0 : parseInt(moneyStatistic[type], 10);
      moneyStatistic[type] += (curCost + offersCost);
    });

    return this._sortObjFromBigToLower(moneyStatistic);
  }

  _sortObjFromBigToLower(obj) {
    return Object.fromEntries(Object.entries(obj).sort((a, b) => b[1] - a[1]));
  }


  _getTimeStatistic() {
    let getTimeStatistic = {};
    this._pointsModel.getPoints().forEach(({type, dateStart, dateEnd}) => {
      const curDration = getDateDiffInMinutes(dateStart, dateEnd);
      if (curDration) {
        getTimeStatistic[type] = isNaN(parseInt(getTimeStatistic[type], 10)) ? 0 : parseInt(getTimeStatistic[type], 10);
        getTimeStatistic[type] += curDration;
      }
    });
    return this._sortObjFromBigToLower(getTimeStatistic);
  }

  _getTypeStatistic() {
    let getTypeStatistic = {};
    this._pointsModel.getPoints().forEach(({type}) => {
      getTypeStatistic[type] = isNaN(parseInt(getTypeStatistic[type], 10)) ? 0 : parseInt(getTypeStatistic[type], 10);
      getTypeStatistic[type]++;
    });
    return this._sortObjFromBigToLower(getTypeStatistic);
  }

  show() {
    this._statView.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._statView.getElement().classList.add(`visually-hidden`);
  }
}
