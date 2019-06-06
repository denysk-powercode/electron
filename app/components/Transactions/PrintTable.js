/* eslint-disable camelcase */
import React from 'react';
import { object } from 'prop-types';
import moment from 'moment';

const PrintTable = ({
  data: { id, created_at, client, user, materials, total_price, total_weight, additional_info },
}) => {
  const len = materials.length - 1;
  const styledTd = (content) => (
    <td
      style={{
        padding: '10px 5px',
        borderStyle: 'solid',
        borderWidth: '1px',
        overflow: 'hidden',
        wordBreak: 'normal',
        borderColor: 'black',
      }}
    >
      {content}
    </td>
  );
  const styledTh = (content) => (
    <th
      style={{
        fontWeight: 'normal',
        padding: '10px 5px',
        borderStyle: 'solid',
        borderWidth: '1px',
        overflow: 'hidden',
        wordBreak: 'normal',
        borderColor: 'black',
      }}
    >
      {content}
    </th>
  );
  return (
    <>
      <table
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          borderCollapse: 'collapse',
          borderSpacing: 0,
        }}
      >
        <tr>
          {styledTh('Id')}
          {styledTh('Date')}
          {styledTh('Client')}
          {styledTh('Materials')}
          {styledTh('Total weight')}
          {styledTh('Total price')}
          {styledTh('Creator')}
          {styledTh('Info')}
        </tr>
        <tr>
          {styledTd(id)}
          {styledTd(moment(created_at).format('DD.MM.YY HH:mm'))}
          {styledTd(`${client.first_name} ${client.last_name}`)}
          {styledTd(materials.reduce((acc, item, index) => `${acc}${item.title}${index !== len ? ', ' : ''}`, ''))}
          {styledTd(total_weight)}
          {styledTd(total_price)}
          {styledTd(`${user.first_name} ${user.last_name}`)}
          {styledTd(additional_info)}
        </tr>
      </table>
    </>
  );
};

PrintTable.propTypes = {
  data: object,
};

export default PrintTable;
