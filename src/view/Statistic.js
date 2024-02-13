import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AbstractView from "./AbstractView";
import {formatDateFromMintutes} from "../utils/date";

const STATISTIC_TITLES = {
  MONEY: `MONEY`,
  TYPE: `TYPE`,
  TIME: `TIME`,
};

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

export default class Statistic extends AbstractView {
  constructor(money, type, time) {
    super();
    this._money = money;
    this._type = type;
    this._time = time;
    this.initStatistic();
  }

  initStatistic() {
    this._installStatistic(this.getElement().querySelector(`#money`), STATISTIC_TITLES.MONEY, Object.keys(this._money), Object.values(this._money));
    this._installStatistic(this.getElement().querySelector(`#type`), STATISTIC_TITLES.TYPE, Object.keys(this._type), Object.values(this._type));
    this._installStatistic(this.getElement().querySelector(`#time-spend`),
        STATISTIC_TITLES.TIME,
        Object.keys(this._time), Object.values(this._time),
        (val) => formatDateFromMintutes(val)
    );
  }

  _installStatistic(element, title, labels, dateset, formater = (val) => val) {
    const BAR_HEIGHT = 55;
    element.height = BAR_HEIGHT * labels.length;

    new Chart(element, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data: dateset,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: formater,
          },
        },
        title: {
          display: true,
          text: title,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }

  getTemplate() {
    return createStatisticTemplate();
  }
}
