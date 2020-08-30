import service from '@/util/request.ts';

export const getOrdersList = async (data) => {
  return await service({
    url: `/order?page=${data.page}&pageSize=${data.pageSize}`,
    method: 'get'
  });
};

export const addOrder = async (data) => {
  return await service({
    url:`/order`,
    method:'post',
    data:data
  });
}