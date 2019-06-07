import React, { useState } from 'react';
import { Button, Input, Icon, Popup } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import DatePicker from 'react-datepicker';

const validate = (num) => (Math.sign(Number(num)) === -1 || Number(num) < 0 ? 0 : num);
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
            selected={from}
            onChange={(date) => {
              setFrom(date);
              onChange({ from: date, to: filter?.value?.to });
            }}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          <DatePicker
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
    Header: 'Client',
    id: 'client',
    sortable: false,
    accessor: ({ client }) => `${client.first_name} ${client.last_name}`,
  },
  {
    Header: 'Materials',
    id: 'material',
    sortable: false,
    accessor: ({ materials }) => {
      const len = materials.length - 1;
      return materials.reduce((acc, item, index) => `${acc}${item.title}${index !== len ? ', ' : ''}`, '');
    },
    style: {
      whiteSpace: 'normal',
      textAlign: 'center',
    },
  },
  {
    Header: 'Total weight',
    accessor: 'total_weight',
    /* eslint-disable-next-line react/prop-types */
    Filter: ({ filter, onChange }) => {
      const [from, setFrom] = useState('');
      const [to, setTo] = useState('');
      return (
        <InputsWrapper>
          <StyledInput
            type="number"
            value={from}
            placeholder="From"
            onChange={(e) => {
              setFrom(validate(e.target.value));
              onChange({ from: validate(e.target.value), to: validate(filter?.value?.to) });
            }}
          />
          <StyledInput
            type="number"
            value={to}
            placeholder="To"
            onChange={(e) => {
              setTo(validate(e.target.value));
              onChange({ from: validate(filter?.value?.from), to: validate(e.target.value) });
            }}
          />
        </InputsWrapper>
      );
    },
  },
  {
    Header: 'Total price',
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
    Header: 'Creator',
    id: 'user',
    sortable: false,
    accessor: ({ user }) => `${user.first_name} ${user.last_name}`,
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
  {
    Header: 'Controls',
    accessor: '',
    sortable: false,
    filterable: false,
    Cell: (props) => (
      <Button
        /* eslint-disable-next-line react/prop-types */
        onClick={() => props.tdProps.rest.actions.openPrint(props.original)}
        content="Print"
      />
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

export default materialsColumns;
