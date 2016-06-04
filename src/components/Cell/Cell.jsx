import React, { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes';

const Cell = ({ children, Component, data, rowIndex, name }) => {
  return (
    <Component>{children || data.getIn([rowIndex, name])}</Component>
  );
};


Cell.propTypes = {
  Component: PropTypes.string,
  data: ImmutablePropTypes.list,
};

Cell.defaultProps = {
  Component: 'td',
};

export default Cell;
