import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useInputs = (...inputs) => {
  return inputs.reduce((init, item) => {
    const [value, setValue] = useState(item.initialValue || '');
    init[item.name || item] = {
      value,
      onChange: (e) => setValue(e.target.value),
    };
    return init;
  }, {});
};
