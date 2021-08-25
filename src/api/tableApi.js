import axiosClient from './axiosClient';

const productApi = {
  getAll: params => {
    const url = '/table';
    return axiosClient.get(url, {params});
  },
  addTable: params => {
    const url = '/table';
    return axiosClient.post(url, {params});
  },
  editTable: params => {
    const url = '/table';
    return axiosClient.patch(url, {params});
  },
  deleteTable: params => {
    const url = '/table';
    return axiosClient.delete(url, {_id: '6125cdb47f9d913db82d62ce'});
  },
};
export default productApi;
