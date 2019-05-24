import { createAction } from 'redux-actions';

export const fetchMaterials = createAction('FETCH_MATERIALS', (offset = 0, limit = 10, sorted = {}, filtered = []) => ({
  offset,
  limit,
  sorted,
  filtered,
}));
export const fetchMaterialsSuccess = createAction('FETCH_MATERIALS_SUCCESS', (materials, totalCount) => ({
  materials,
  totalCount,
}));
export const fetchMaterialsFailure = createAction('FETCH_MATERIALS_FAILURE');

export const createMaterial = createAction('CREATE_MATERIAL', (data, cb) => ({ data, cb }));
export const createMaterialSuccess = createAction('CREATE_MATERIAL_SUCCESS', (material) => ({ material }));
export const createMaterialFailure = createAction('CREATE_MATERIAL_FAILURE');

export const updateMaterial = createAction('UPDATE_MATERIAL', (data, cb) => ({ data, cb }));
export const updateMaterialSuccess = createAction('UPDATE_MATERIAL_SUCCESS', (material) => ({ material }));
export const updateMaterialFailure = createAction('UPDATE_MATERIAL_FAILURE');

export const importCSV = createAction('IMPORT_MATERIALS_CSV', (file) => ({ file }));
export const importCSVSuccess = createAction('IMPORT_MATERIALS_CSV_SUCCESS');
export const importCSVFailure = createAction('IMPORT_MATERIALS_CSV_FAILURE');
