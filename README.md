# Deluxe Table
A compossible and extendable react table component.

## How To Use

```
  import React from 'react';
  import { fromJS } from 'immutable';
  import { Table, Cell } from 'deluxe-table';
  import data from './data.json';

  const dataList = fromJS(data);

  const TableApp = ({}) => (
    <Table
      scope="table-app"
      rowHeight={30}
      headerHeight={30}
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

  export default TableApp;
```

## Component Types

### Column Definition
- `name: String` - column name
- `Header: Component` - component for column header
- `Cell: Component` - component for column cell

## Component Configuration

### Table
- `scope: String - required` - key used in reducer to namespace state for the instance
- `data: Immutable.List - required` - single list level list of records to display
- `rowHeight: Number` - height of table wrapper
- `headerHeight: Number` - height of the table header
- `width: Number` - width of table wrapper
- `height: Number` - height of table wrapper
- `columns: [ColumnDefinition]` - single list level list of records to display

## Milestones
- [X] Base Components:
    - [X] Table
    - [X] Cell
- [X] Sticky Table Header
- [ ] Basic Scrolling
- [ ] Grouping Features:
  - [ ] N-level
  - [ ] Sticky sub headers
