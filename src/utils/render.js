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

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};
