import { Map } from 'immutable';
import { add, ifElse, compose } from 'ramda';

const CHANGE_Y_COORDINATE = 'deluxeTable/CHANGE_Y_COORDINATE';
const CHANGE_X_COORDINATE = 'deluxeTable/CHANGE_X_COORDINATE';

const createAction = type => payload => ({
  type,
  payload,
});

export const changeYCoordinate = createAction(CHANGE_Y_COORDINATE);
export const changeXCoordinate = createAction(CHANGE_X_COORDINATE);

const updateCoordinate = (bound, delta) => compose(
  ifElse(
    cord => cord > bound,
    () => bound,
    cord => cord
  ),
  add(delta)
);

const handleCoordindateChange = cordKey => (state, { scope, change, bound }) => {
  return state
    .updateIn([scope, cordKey], bound, updateCoordinate(bound, change));
};

const handleYChange = handleCoordindateChange('scrollY');
const handleXChange = handleCoordindateChange('scrollX');

export const reducer = (state = new Map(), { type, payload }) => {
  switch (type) {
    case CHANGE_Y_COORDINATE:
      return handleYChange(state, payload);
    case CHANGE_X_COORDINATE:
      return handleXChange(state, payload);
    default:
      return state;
  }
};


export default reducer;
