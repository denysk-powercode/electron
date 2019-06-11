/* eslint-disable react/prop-types */
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
    Cell: ({ original, tdProps }) => (
      <ControlsWrapper>
        <RelatedBlock>
          <StyledIcon
            name={original.related_transaction_id ? 'linkify' : 'ban'}
            disabled={!tdProps.rest.states.isPaydeskOpen || Boolean(original.related_transaction_id)}
            size="big"
            onClick={() => tdProps.rest.actions.onCancelTransactionClick(original)}
          />
          <RelatedId>{original.related_transaction_id}</RelatedId>
        </RelatedBlock>

        <Button size="small" onClick={() => tdProps.rest.actions.openPrint(original)} content="Print" />
      </ControlsWrapper>
    ),

    headerStyle: {
      minWidth: '150px',
    },
    style: {
      minWidth: '150px',
    },
  },
];

const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const RelatedBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RelatedId = styled.span`
  font-size: 10px;
`;

const StyledIcon = styled(Icon)`
  color: ${(props) => !props.disabled && '#bb2929'};
  transition: opacity 0.15s;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'normal' : 'pointer')};
    opacity: 0.5;
  }
  &&& {
    margin-right: 0;
  }
`;

const StyledInput = styled(Input)`
  width: 45%;
`;

export default materialsColumns;
