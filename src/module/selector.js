import { createSelector, createStructuredSelector } from 'reselect';
import { Map } from 'immutable';

const deluxeRootSelector = ({ deluxeTable }) => deluxeTable;
const scopePropSelector = (state, { scope }) => scope;

const sessionSelector = createSelector(
  deluxeRootSelector,
  scopePropSelector,
  (state, scope) => state.get(scope, new Map())
);

const scrollXSelector = createSelector(
  sessionSelector,
  session => session.get('scrollX', 0)
);

const scrollYSelector = createSelector(
  sessionSelector,
  session => session.get('scrollY', 0)
);

export default createStructuredSelector({
  scrollX: scrollXSelector,
  scrollY: scrollYSelector,
});
