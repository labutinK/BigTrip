import AbstractView from "./AbstractView";
import AbstractToggleView from "./AbstractToggleView";
import {DOM_POSITIONS, renderElement} from "../utils/render";

const createStatisticTemplate = () => {
  return `
        <section class="statistics">
          <h2 class="">Trip statistics</h2>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
          </div>
        </section>
    `;
};

export default class Statistic extends AbstractToggleView {
  constructor() {
    super();
  }

  getTemplate() {
    return createStatisticTemplate();
  }
}
