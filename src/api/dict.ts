import service from '@/util/request.ts';

export const getCountryList = async (data) => {
  return await service({
    url: `/country?page=${data.page}&pageSize=${data.pageSize}`,
    method: 'get'
  });
};