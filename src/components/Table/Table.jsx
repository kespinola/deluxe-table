import React, { PropTypes } from 'react'
import styles from './table.css';
import Cell from './../Cell';

const Table = ({ className, columns, data, DefaultCell, idField }) => {
  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map(({ Header, name }, i) => (
            <Header key={name} data={data} rowIndex={i} name={name} />
          ))}
        </tr>
      </thead>
      <tbody>
          {data.map((row, i) => {
            return (
              <tr key={row.get(idField)}>
                {columns.map(({ name, Cell }) => {
                  const CurrentCell = (Cell || DefaultCell);
                  return (
                    <CurrentCell
                      key={`${name}_${row.get(idField)}`}
                      data={data}
                      rowIndex={i}
                      name={name}
                    />
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Table.defaultProps = {
  className: 'pure-table',
  width: 1000,
  height: 500,
  DefaultCell: Cell,
  idField: 'id',
};

export default Table;
