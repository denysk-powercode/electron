/* eslint-disable react/prop-types,camelcase */
import React, { useState } from 'react';
import { Input, Icon, Popup, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import transactionTypes from '../../../constants/transactionTypes';

const options = [
  {
    value: 0,
    text: 'Open paydesk',
  },
  {
    value: 1,
    text: 'Close paydesk',
  },
  {
    value: 2,
    text: 'Add cash',
  },
  {
    value: 3,
    text: 'Withdraw cash',
  },
  {
    value: 4,
    text: 'Transaction',
  },
  {
    value: 5,
    text: 'Canceled transaction',
  },
];

const materialsColumns = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Date',
    sortable: false,
    /* eslint-disable-next-line react/prop-types */
    Filter: ({ filter, onChange }) => {
      const [from, setFrom] = useState('');
      const [to, setTo] = useState('');
      return (
        <InputsWrapper>
          <DatePicker
            isClearable
            selected={from}
            onChange={(date) => {
              setFrom(date);
              onChange({ from: date, to: filter?.value?.to });
            }}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          <DatePicker
            isClearable
            selected={to}
            onChange={(date) => {
              setTo(date);
              onChange({ from: filter?.value?.from, to: date });
            }}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </InputsWrapper>
      );
    },
    id: 'created_at',
    // eslint-disable-next-line camelcase
    accessor: ({ created_at }) => moment(created_at).format('DD.MM.YY HH:mm'),
    headerStyle: {
      minWidth: '400px',
      overflow: 'visible',
    },
    style: {
      minWidth: '400px',
    },
  },
  {
    Header: 'Amount',
    accessor: 'total_price',
    /* eslint-disable-next-line react/prop-types */
    Filter: ({ filter, onChange }) => {
      return (
        <InputsWrapper>
          <StyledInput
            type="number"
            placeholder="From"
            onChange={(e) => onChange({ from: e.target.value, to: filter?.value?.to })}
          />
          <StyledInput
            type="number"
            placeholder="To"
            onChange={(e) => onChange({ from: filter?.value?.from, to: e.target.value })}
          />
        </InputsWrapper>
      );
    },
  },
  {
    Header: 'Paydesk amount after transaction',
    accessor: 'amount_after_transaction',
    Filter: ({ filter, onChange }) => {
      return (
        <InputsWrapper>
          <StyledInput
            type="number"
            placeholder="From"
            onChange={(e) => onChange({ from: e.target.value, to: filter?.value?.to })}
          />
          <StyledInput
            type="number"
            placeholder="To"
            onChange={(e) => onChange({ from: filter?.value?.from, to: e.target.value })}
          />
        </InputsWrapper>
      );
    },
    // headerStyle: {
    //   minWidth: '150px',
    //   whiteSpace: 'normal',
    // },
  },
  {
    Header: 'Type',
    id: 'type',
    sortable: false,
    accessor: ({ transaction_type }) => transactionTypes[transaction_type],
    Filter: ({ onChange }) => {
      const handler = (e, data) => onChange(data.value);
      return (
        <StyledDropdown
          clearable
          options={options}
          onChange={handler}
          placeholder="Select operation type"
          fluid
          selection
          selectOnBlur={false}
        />
      );
    },
    headerStyle: {
      overflow: 'visible',
      minWidth: '200px',
    },
    style: {
      minWidth: '200px',
    },
  },
  {
    Header: 'Creator',
    id: 'user',
    sortable: false,
    accessor: ({ user }) => `${user.first_name} ${user.last_name}`,
  },
  {
    Header: 'Source',
    id: 'source',
    sortable: false,
    accessor: ({ source }) => source || '-',
  },
  {
    Header: 'Info',
    accessor: 'additional_info',
    sortable: false,
    filterable: false,
    Cell: (row) => (
      <Popup hoverable disabled={!row.value} trigger={<Icon name="info" size="large" />} content={row.value} />
    ),
  },
];

const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 45%;
`;

const StyledDropdown = styled(Dropdown)`
  &&&&& {
    padding-top: 6.5px;
    padding-bottom: 6.5px;
    min-height: 10px;
    text-align: center;

    i {
      padding-top: 6.5px;
      padding-bottom: 6.5px;
    }
  }
`;

export default materialsColumns;
