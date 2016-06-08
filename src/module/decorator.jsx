import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import {
  changeYCoordinate,
  changeXCoordinate,
} from './duck';
import selector from './selector';
import hamster from 'hamsterjs';

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
      hamster(findDOMNode(this)).wheel((event, delta, deltaX, deltaY) => {
        const { actions: { changeXCoordinate, changeYCoordinate } } = this.props;
        event.preventDefault();
        event.stopPropagation();
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          changeYCoordinate(deltaY);
        } else {
          changeXCoordinate(deltaX);
        }
      });
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
