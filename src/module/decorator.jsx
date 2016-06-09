import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import {
  changeYCoordinate,
  changeXCoordinate,
} from './duck';
import selector from './selector';
import hamster from 'hamsterjs';
import flyd from 'flyd';

const mapDispatch = (dispatch, { scope, headerHeight }) => ({
  actions: {
    changeYCoordinate:
      change => dispatch(changeYCoordinate({ scope, bound: headerHeight, change })),
    changeXCoordinate:
      change => dispatch(changeXCoordinate({ scope, bound: 0, change })),
  },
});


const deluxeTable = Component => {
  class DecoratedComponent extends React.Component {
    componentDidMount() {
      const { actions: { changeXCoordinate, changeYCoordinate } } = this.props;
      const el = findDOMNode(this);
      const wheel$ = flyd.stream();
      const mouseDown$ = flyd.stream(false);
      const mouseMove$ = flyd.stream(false);
      el.addEventListener('mousemove', mouseMove$);
      el.addEventListener('mousedown', () => mouseDown$(true));
      el.addEventListener('mouseup', () => mouseDown$(false));

      const drag$ = flyd.combine(
        (mouseDown, mouseMove, self, updated) => {
          if (mouseDown()) {
            self(mouseMove());
          }
        },
        [mouseDown$, mouseMove$]
      );

      flyd.map((mouseMove) => {
        console.log(mouseMove.offsetY, mouseMove.offsetX, mouseMove.movementY, mouseMove.movementX);
      }, drag$);

      hamster(el).wheel((event, delta, deltaX, deltaY) => {
        event.preventDefault();
        event.stopPropagation();
        wheel$({ deltaX, deltaY });
      });

      flyd.map(({ deltaX, deltaY }) => {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return changeYCoordinate(deltaY);
        }
        return changeXCoordinate(deltaX);
      }, wheel$);
    }

    render() {
      return <Component {...this.props} />;
    }
  }


  return connect(
    selector,
    mapDispatch
  )(DecoratedComponent);
};

export default deluxeTable;
