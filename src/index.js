import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import Table from './components/Table';
import Cell from './components/Cell';
import container from './module/container.jsx';
import reducer from './module/duck';
import data from './data.json';

const store = createStore(reducer, {});
const dataList = fromJS(data);

const TableApp = () => (
  <Table
    data={dataList}
    columns={[
      {
        name: 'first_name',
        Header: () => <Cell Component="th">First Name</Cell>,
      },
      {
        name: 'last_name',
        Header: () => <Cell Component="th">Last Name</Cell>,
      },
      {
        name: 'gender',
        Header: () => <Cell Component="th">Gender</Cell>,
      },
      {
        name: 'email',
        Header: () => <Cell Component="th">Email</Cell>,
      },
    ]}
  />
);

const ConnectTableApp = container(TableApp);

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <ConnectTableApp />
    </Provider>
    ,
    document.getElementById('root')
  );
});
