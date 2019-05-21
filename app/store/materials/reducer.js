/* eslint-disable no-param-reassign,no-unused-vars */
import * as actions from './actions';
import handleActions from '../immerHandleActions';

const initialState = {
  materialsMap: {},
  materialsIds: [],
  totalCount: 0,
  isLoading: false,
};

const materialReducer = handleActions(
  {
    [actions.fetchMaterials]: (draft) => {
      draft.isLoading = true;
    },
    [actions.fetchMaterialsSuccess]: (draft, { payload: { materials, totalCount } }) => {
      draft.isLoading = false;
      draft.totalCount = totalCount;
      draft.materialsIds = [];
      materials.forEach((material) => {
        draft.materialsMap[material.id] = material;
        draft.materialsIds.push(material.id);
      });
    },
    [actions.createMaterialSuccess]: (draft, { payload: { material } }) => {
      draft.materialsIds.push(material.id);
      draft.materialsMap[material.id] = material;
      draft.totalCount += 1;
    },
    [actions.updateMaterialSuccess]: (draft, { payload: { material } }) => {
      draft.materialsMap[material.id] = material;
    },
    [actions.deleteMaterialSuccess]: (draft, { payload: { id } }) => {
      draft.materialsIds = draft.materialsIds.filter((item) => item !== id);
      delete draft.materialsMap[id];
    },
    [actions.fetchMaterialsFailure]: (draft) => {
      draft.isLoading = false;
    },
  },
  initialState
);

export default materialReducer;
