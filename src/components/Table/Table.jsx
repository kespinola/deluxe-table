import React, { PropTypes } from 'react'
import cx from 'classnames';
import { sum, pluck, compose, subtract, add, negate } from 'ramda';
import styles from './table.css';
import deluxeTable from './../../module/decorator';

const sumColumnWidth = compose(
  sum,
  pluck('width')
);

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
  const totalWidth = sumColumnWidth(columns);
  const overflowX = subtract(totalWidth, width);
  const finalScrollX = add(overflowX, scrollX) < 0 ? negate(overflowX) : scrollX;
  return (
    <div
      className={cx(className, styles.table)}
      style={{ height, width }}
    >
      <div style={{ width: totalWidth }}>
        <div
          style={{
            height: headerHeight,
            width: totalWidth,
            transform: `translate3d(${finalScrollX}px, 0px, 0px)`,
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
                className: styles.header_cell,
              }
            )
          ))}
        </div>
        <div
          className={styles.row_wrapper}
          style={{ transform: `translate3d(${finalScrollX}px, ${scrollY}px, 0px)` }}
        >
          {data.map((row, i) => {
            return (
              <div
                key={row.get(idField)}
                className={cx(rowClassName, styles.body_row)}
                style={{ width: totalWidth }}
              >
                {columns.map(({ name, cell: columnCell, width: columnWidth }) => {
                  return React.cloneElement(columnCell, {
                    data,
                    name,
                    rowIndex: i,
                    className: styles.body_cell,
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
