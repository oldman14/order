import axiosClient from './axiosClient';

const orderApi = {
  getAll: params => {
    const url = '/order';
    return axiosClient.get(url, {params});
  },
  addOrder: params => {
    const url = '/order';
    return axiosClient.post(url, {params});
  },
};
export default orderApi;
