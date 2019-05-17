import { useReducer } from 'react';

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN': {
      return { ...state, [action.name]: true };
    }
    case 'CLOSE': {
      return { ...state, [action.name]: false };
    }
    default:
      return state;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const useModals = (...modals) => {
  const initialState = modals.reduce((init, item) => {
    if (typeof item === 'string') {
      init[item] = false;
    } else {
      init[item.name] = item.isOpened;
    }
    return init;
  }, {});
  return useReducer(modalReducer, initialState);
};
