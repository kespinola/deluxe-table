import React, { PropTypes } from 'react'
import styles from './scrollbar.css';
import { equals } from 'ramda';

class Scrollbar extends React.Component {
  render() {
    const { sliderSize, axis, top, left, containerSize, transform, } = this.props;
    const isVertical = equals(axis, 'vertical');
    return (
      <div className={styles[`${axis}_bar_wrapper`]} style={{ top, left }}>
        <div
          className={styles[`${axis}_bar`]}
          onDrag={() => { debugger; }}
          style={{ [isVertical ? 'height' : 'width']: sliderSize, transform }}
        />
      </div>
    );
  }
}

export default Scrollbar;
