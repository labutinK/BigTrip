export const isEvtEscape = (evt) => {
  evt = evt || window.event;
  return (evt.key === `Escape` || evt.key === `Esc`);
};
