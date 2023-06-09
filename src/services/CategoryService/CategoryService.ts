import { AxiosError } from 'axios';
import Api from '../../clients/api/Api';
import { CategoryValues, NewCategoryParams } from '../../domains/category';
import { RequestError } from '../../domains/request';

const createCategory = async ({ description }: NewCategoryParams): Promise<CategoryValues> => {
  return Api.post({
    url: '/category',
    body: {
      description,
    },
  })
    .then(response => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

const getCategories = async () => {
  return Api.get({
    url: '/category',
  })
    .then(response => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const CategoryService = {
  createCategory,
  getCategories,
};
