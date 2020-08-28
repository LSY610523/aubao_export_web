import service from '@/util/request.ts';

export const getCountryList = async (data) => {
  return await service({
    url: `/country?page=${data.page}&pageSize=${data.pageSize}`,
    method: 'get'
  });
};

export const postData = async (data) => {
  return await service({
    url: `/country`,
    method: 'post',
    data: {
      // 要给后端的
      list: data,
    }
    // data,
  });
};