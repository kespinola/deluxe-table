# Deluxe Table
A compossible and extendable react table component.

## How It Works

```
  import React from 'react';
  import { fromJS } from 'immutable';
  import Table from './components/Table';
  import Cell from './components/Cell';
  import container from './module/container.jsx';
  import data from './data.json';

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

  export default ConnectTableApp
```

### Component Types

### Column Definition
- `name: String` - column name
- `Header: Component` - component for column header
- `Cell: Component` - component for column cell

## Component Configuration

### Table
- `data: Immutable.List` - single list level list of records to display
- `columns: [ColumnDefinition]` - single list level list of records to display

### Milestones
- [ ] Base Components:
    - [X] Table
    - [X] Cell
- [ ] Sticky Table Header
- [ ] Grouping Features:
  - [ ] N-level
  - [ ] Sticky sub headers
