import request from '@/utils/request.js'

export const getSystemInfo = () => {
  return request({
    method: 'GET',
    url: '/admin/systemInfo'
  })
}
