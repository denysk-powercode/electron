/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const getMaterials = (state) => state.materials.materialsMap;
const getMaterialsIds = (state) => state.materials.materialsIds;

export const selectMaterials = createSelector(
  [getMaterials, getMaterialsIds],
  (materials, ids) => ids.map((id) => materials[id])
);
