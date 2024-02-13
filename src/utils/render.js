import AbstractView from "../view/AbstractView";
import AbstractSmart from "../view/AbstractSmart";

export const DOM_POSITIONS = {
  BEFOREBEGIN: `beforebegin`,
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

/**
 * Вставляет DOM-элемент в указанное место в контейнере.
 *
 * @param {HTMLElement} container - Контейнер, куда будет вставлен элемент.
 * @param {HTMLElement} element - Элемент, который необходимо вставить.
 * @param {string} position - Позиция отрисовки (beforebegin, afterbegin, beforeend, afterend).
 */
export const renderElement = function (container, element, position) {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }
  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (position) {
    case DOM_POSITIONS.BEFOREBEGIN:
      container.before(element);
      break;
    case DOM_POSITIONS.AFTERBEGIN:
      container.prepend(element);
      break;
    case DOM_POSITIONS.BEFOREEND:
      container.appendChild(element);
      break;
    case DOM_POSITIONS.AFTEREND:
      container.after(element);
      break;
    default:
      throw new Error(`Unknown position: ${position}`);
  }
};


export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }
  if (component.getElement()) {
    component.getElement().remove();
  }
  component.removeElement();
};
