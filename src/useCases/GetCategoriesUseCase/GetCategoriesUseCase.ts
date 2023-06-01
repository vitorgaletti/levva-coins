import { CategoryValues } from '../../domains/category';
import { RequestError } from '../../domains/request';
import { CategoryService } from '../../services/CategoryService/CategoryService';
import {
  loadCategory,
  loadCategoryDone,
  loadCategoryFail,
} from '../../stores/CategoryStore/CategoryEvents';

const execute = async (): Promise<void> => {
  loadCategory();

  return CategoryService.getCategories()
    .then((categories: CategoryValues[]) => {
      loadCategoryDone(categories);
    })
    .catch(({ hasError, message }: RequestError) => {
      loadCategoryFail({ hasError, message });
    });
};

const GetCategoriesUseCase = {
  execute,
};

export default GetCategoriesUseCase;
