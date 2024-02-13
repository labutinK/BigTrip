import AbstractView from "./AbstractView";

const createErrorBanner = (errorMes) => {
  return `<p class="trip-events__msg trip-events__msg--error">${errorMes}<br>
    Reload the page or try later.
</p>`;
};
export default class ErrorApi extends AbstractView {
  constructor(errorMessage) {
    super();
    this._errorMessage = errorMessage;
  }
  getTemplate() {
    return createErrorBanner(this._errorMessage);
  }
}
