import { CategoryValues, NewCategoryParams } from '../../domains/category';
import { RequestError } from '../../domains/request';
import { CategoryService } from '../../services/CategoryService/CategoryService';
import {
  loadCategory,
  loadCategoryFail,
  loadCreateCategoryDone,
} from '../../stores/CategoryStore/CategoryEvents';

const execute = async ({ description }: NewCategoryParams): Promise<void> => {
  loadCategory();

  return CategoryService.createCategory({
    description,
  })
    .then((data: CategoryValues) => {
      loadCreateCategoryDone(data);
    })
    .catch(({ hasError, message }: RequestError) => {
      loadCategoryFail({ hasError, message });
      throw new Error();
    });
};

const NewCategoryUseCase = {
  execute,
};

export default NewCategoryUseCase;
