import service from '@/util/request.ts';

export const getGoodsList = async (data) => {
  return await service({
    url: `/goods?page=${data.page}&pageSize=${data.pageSize}`,
    method: 'get'
  });
};

export const addGoods = async (data) => {
  return await service({
    url:`/goods`,
    method:'post',
    data:data
  });
}

export const editGoods = async (data) =>{
  return await service({
    url:`/goods`,
    method:'put',
    data:data
  })
}

export const deleteGoods = async (data) =>{
  return await service({
    url:`/goods?id=${data.id}`,
    method:'delete',
    data:{}
  })
}