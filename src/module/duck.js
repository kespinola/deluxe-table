import { Map } from 'immutable';
import { add, ifElse, compose } from 'ramda';
const SCROLL_TABLE = 'deluxeTable/SCROLL_TABLE';

export const scrollTable = payload => ({
  type: SCROLL_TABLE,
  payload,
});

const updateCoordinate = delta => compose(
  ifElse(
    cord => cord > 0,
    () => 0,
    cord => cord
  ),
  add(delta)
);

const handleScrollTable = (state, { scope, e: { deltaX, deltaY } }) => {
  return state
    .updateIn([scope, 'scrollX'], 0, updateCoordinate(deltaX))
    .updateIn([scope, 'scrollY'], 0, updateCoordinate(deltaY));
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
