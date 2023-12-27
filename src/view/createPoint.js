import TripPoint from "./TripPoint";
import TripPointEdit from "./TripPointEdit";
import {DOM_POSITIONS, renderElement} from "../utils";


export const createPoint = (wrapper, point) =>{
  const pointItem = new TripPoint(point);
  const pointItemEdit = new TripPointEdit(point);

  const displayForm = () => {
    wrapper.replaceChild(pointItemEdit.getElement(), pointItem.getElement());
  };

  const displayPoint = () => {
    wrapper.replaceChild(pointItem.getElement(), pointItemEdit.getElement());
  };

  pointItem.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    displayForm();
  });

  pointItemEdit.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
    displayPoint();
  });
  pointItemEdit.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    displayPoint();
  });


  renderElement(wrapper, pointItem.getElement(), DOM_POSITIONS[`BEFOREEND`]);
};
