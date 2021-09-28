import request from '@/utils/request.js'

export const getAllUserFile = (params) => {
  return request({
    method: 'GET',
    url: '/admin/allUserFileList',
    params
  })
}
