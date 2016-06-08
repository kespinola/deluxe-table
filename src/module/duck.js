import { Map } from 'immutable';
import { add, ifElse, compose } from 'ramda';
const SCROLL_TABLE = 'deluxeTable/SCROLL_TABLE';

export const scrollTable = payload => ({
  type: SCROLL_TABLE,
  payload,
});

const updateCoordinate = (bound, delta) => compose(
  ifElse(
    cord => cord > bound,
    () => bound,
    cord => cord
  ),
  add(delta)
);

const handleScrollTable = (state, { scope, e: { deltaX, deltaY }, yBound, xBound }) => {
  return state
    .updateIn([scope, 'scrollX'], 0, updateCoordinate(0, deltaX))
    .updateIn([scope, 'scrollY'], yBound, updateCoordinate(yBound, deltaY));
};

export const reducer = (state = new Map(), { type, payload }) => {
  switch (type) {
    case SCROLL_TABLE:
      return handleScrollTable(state, payload);
    default:
      return state;
  }
};


export default reducer;
