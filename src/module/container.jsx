import React from 'react';
import { connect } from 'react-redux';

const container = (Component) => {
  const ContainerComponent = (props) => <Component {...props} />;

  return connect(
    () => ({}),
    () => ({})
  )(ContainerComponent);
};

export default container;
