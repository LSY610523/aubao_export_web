import service from '@/util/request.ts';

export const getCountryList = async (data) => {
  return await service({
    url: `/country?page=${data.page}&pageSize=${data.pageSize}`,
    method: 'get'
  });
};

export const getCurrencyList = async () => {
  return await service({
    url: '/country/all',
    method: 'get',
  });
};

export const getCustomsList = async () => {
  return await service({
    url: '/customscode/all',
    method: 'get',
  });
};
