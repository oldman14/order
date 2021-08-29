import axiosClient from './axiosClient';

const statisticalApi = {
  getAll: params => {
    const url = `/statis`;
    console.log('log paramas', params);
    return axiosClient.get(url, {params});
  },
  getWeek: params => {
    const url = `/statis/week`;
    return axiosClient.get(url, {params});
  },
};
export default statisticalApi;
