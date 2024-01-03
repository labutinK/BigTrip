import TripPoint from "./TripPoint";
import TripPointEdit from "./TripPointEdit";
import {DOM_POSITIONS, renderElement} from "../utils/render";
import {isEvtEscape} from "../utils/common";


export const createPoint = (wrapper, point) =>{
  const pointItem = new TripPoint(point);
  const pointItemEdit = new TripPointEdit(point);

  const closeForm = (evt)=> {
    if (isEvtEscape(evt)) {
      displayPoint();
      document.removeEventListener(`keydown`, closeForm);
    }
  };

  const displayForm = () => {
    wrapper.replaceChild(pointItemEdit.getElement(), pointItem.getElement());
    document.addEventListener(`keydown`, closeForm);
  };

  const displayPoint = () => {
    wrapper.replaceChild(pointItem.getElement(), pointItemEdit.getElement());
  };

  pointItem.setEditOnHandler(displayForm);

  pointItemEdit.setFormSubmitHandler(() => {
    displayPoint();
    document.removeEventListener(`keydown`, closeForm);
  });


  renderElement(wrapper, pointItem.getElement(), DOM_POSITIONS[`BEFOREEND`]);
};
