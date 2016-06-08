import React, { PropTypes } from 'react'
import styles from './scrollbar.css';
import { equals } from 'ramda';

const Scrollbar = ({ sliderSize, axis, top, left, containerSize }) => {
  const isVertical = equals(axis, 'vertical');
  return (
    <div className={styles[`${axis}_bar_wrapper`]} style={{ top, left }}>
      <div
        className={styles[`${axis}_bar`]}
        onDrag={() => { debugger; }}
        style={{ [isVertical ? 'height' : 'width']: sliderSize }}
      />
    </div>
  );
};

export default Scrollbar;
