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

export const getUnitList = async () => {
  return await service({
    url: '/unit/all',
    method: 'get'
  });
};

export const getTrafModeList = async(data) =>{
  return await service({
    url:`/trafmode?page=${data.page}&pageSize=${data.pageSize}`,
    method:'get'
  })
}

export const getUnitListPage = async (data) =>{
  return await service({
    url:`/unit?page=${data.page}&pageSize=${data.pageSize}`,
    method:'get'
  })
}


export const getCustomscode = async (data) =>{
  return await service({
    url:`/customscode?page=${data.page}&pageSize=${data.pageSize}`,
    method:'get'
  })
}