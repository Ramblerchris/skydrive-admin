import request from '@/utils/request.js'

export const getAllFileList = (params) => {
  return request({
    method: 'GET',
    url: '/admin/allFileList',
    params
  })
}
