import AbstractView from "./AbstractView";
const createLoading = () => {
  return `
  <p class="trip-events__msg">Loading...</p>
    `;
};

export default class Loading extends AbstractView {
  constructor() {
    super();
  }


  getTemplate() {
    return createLoading();
  }
}
