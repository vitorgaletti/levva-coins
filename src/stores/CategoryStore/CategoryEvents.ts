import { createEvent } from 'effector';
import { CategoryValues } from '../../domains/category';
import { RequestError } from '../../domains/request';

export const loadCategory = createEvent('loadCategory');
export const loadCreateCategoryDone = createEvent('loadCreateCategoryDone');
export const loadCategoryDone = createEvent<CategoryValues[]>('loadCategoryDone');
export const loadCategoryFail = createEvent<RequestError>('loadCategoryFail');
