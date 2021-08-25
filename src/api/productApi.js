import axiosClient from './axiosClient';

const productApi = {
  getAll: params => {
    const url = '/product';
    return axiosClient.get(url, {params});
  },
  addProduct: params => {
    const url = '/product';
    return axiosClient.post(url, {params});
  },
};
export default productApi;
