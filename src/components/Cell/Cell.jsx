import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes';

const Cell = ({
  children,
  Component,
  data,
  rowIndex,
  name,
  style,
  className,
}) => {
  return (
    <Component
      {...{
        className,
        style,
      }}
    >
      {children || data.getIn([rowIndex, name])}
    </Component>
  );
};


Cell.propTypes = {
  Component: PropTypes.string,
  data: ImmutablePropTypes.list,
};

Cell.defaultProps = {
  Component: 'div',
};

export default Cell;
