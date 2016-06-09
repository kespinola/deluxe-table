import React, { PropTypes } from 'react'
import cx from 'classnames';
import { sum, pluck, compose, subtract, add, negate, divide, multiply } from 'ramda';
import Scrollbar from './../Scrollbar';
import styles from './table.css';
import deluxeTable from './../../module/decorator';

const sumColumnWidth = compose(
  sum,
  pluck('width')
);

const getTranslate = (x = 0, y = 0, z = 0) => `translate3d(${x}px, ${y}px, ${z}px)`;

const Table = ({
  className,
  columns,
  data,
  defaultCell,
  idField,
  maxHeight,
  cssPrefix,
  rowClassName,
  headerClassName,
  height,
  width,
  headerHeight,
  rowHeight,
  scrollY,
  scrollX,
}) => {
  const bodyWidth = sumColumnWidth(columns);
  const viewPortHeight = height - headerHeight;
  const bodyHeight = multiply(data.count(), rowHeight);
  const bodyOutOfView = bodyHeight - viewPortHeight;
  const overflowX = subtract(bodyWidth, width);
  const finalScrollX = add(overflowX, scrollX) < 0 ? negate(overflowX) : scrollX;
  return (
    <div
      className={cx(className, styles.table)}
      style={{ height, width }}
    >
      <div style={{ width: bodyWidth }}>
        <div
          style={{
            height: headerHeight,
            width: bodyWidth,
            transform: getTranslate(finalScrollX),
          }}
          className={cx(headerClassName, styles.header)}
        >
          {columns.map(({ header, name, width: columnWidth }, i) => (
            React.cloneElement(
              header,
              {
                data,
                name,
                key: name,
                rowIndex: i,
                style: { height: headerHeight, width: columnWidth },
                className: cx('deluxe__header__cell', styles.header_cell),
              }
            )
          ))}
        </div>
        <Scrollbar
          axis="horizontal"
          sliderSize={width - subtract(bodyWidth, width)}
          onDragBar={null}
          transform={`0px, 0px, 0px`}
        />
        <Scrollbar
          axis="vertical"
          top={headerHeight}
          sliderSize={divide(bodyOutOfView, viewPortHeight)}
          transform={getTranslate(0, negate(scrollY))}
          onDragBar={null}
        />
        <div
          className={styles.row_wrapper}
          style={{ transform: getTranslate(finalScrollX, scrollY) }}
        >
          {data.map((row, i) => {
            return (
              <div
                key={row.get(idField)}
                className={cx(rowClassName, styles.body_row)}
                style={{ width: bodyWidth }}
              >
                {columns.map(({ name, cell: columnCell, width: columnWidth }) => {
                  return React.cloneElement(columnCell, {
                    data,
                    name,
                    rowIndex: i,
                    className: cx('deluxe__body_cell', styles.body_cell),
                    key: `${name}_${row.get(idField)}`,
                    style: { height: rowHeight, width: columnWidth },
                  });
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Table.defaultProps = {
  className: 'deluxe__table__app',
  idField: 'id',
  maxHeight: 700,
  cssPrefix: 'deluxe',
  rowClassName: '',
  headerClassName: '',
};

export default deluxeTable(Table);
