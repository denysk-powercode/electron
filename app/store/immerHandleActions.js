import { produce } from 'immer/dist/immer';

const handleActions = (actionsMap, defaultState) => (state = defaultState, { type, ...params }) =>
  produce(state, (draft) => {
    const resolvedType = typeof type === 'function' ? type.toString() : type;
    const action = actionsMap[resolvedType];
    return action && action.call(null, draft, params);
  });

export default handleActions;
