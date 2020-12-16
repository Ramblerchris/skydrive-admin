import request from '@/utils/request.js'

export const login = (user) => {
  return request({
    method: 'POST',
    url: '/user/signin',
    params: user
  })
}
