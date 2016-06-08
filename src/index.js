import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import { Table, Cell } from './components';
import deluxeTableReducer from './module/duck';
import styles from './assets/styles/app.css';
import data from './data.json';

const reducer = combineReducers({
  deluxeTable: deluxeTableReducer,
});

const store = createStore(reducer);

const dataList = fromJS(data);

const TableApp = () => (
  <Table
    className={styles.table_app}
    scope="table-app"
    rowHeight={30}
    headerHeight={40}
    width={600}
    height={500}
    data={dataList}
    columns={[
      {
        name: 'first_name',
        header: <Cell>First Name</Cell>,
        cell: <Cell />,
        width: 150,
      },
      {
        name: 'last_name',
        header: <Cell>Last Name</Cell>,
        cell: <Cell />,
        width: 150,
      },
      {
        name: 'gender',
        header: <Cell>Gender</Cell>,
        cell: <Cell />,
        width: 150,
      },
      {
        name: 'email',
        header: <Cell>Email</Cell>,
        cell: <Cell />,
        width: 250,
      },
    ]}
  />
);


document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <TableApp />
    </Provider>
    ,
    document.getElementById('root')
  );
});
