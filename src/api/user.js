import request from '@/utils/request.js'

export const login = (user) => {
  return request({
    method: 'POST',
    url: '/user/signin',
    params: user
  })
}

export const getUserinfo = () => {
  return request({
    method: 'GET',
    url: '/user/getuserinfo'
  })
}

export const signout = () => {
  return request({
    method: 'GET',
    url: '/user/signout'
  })
}

export const allUserList = params => {
  return request({
    method: 'GET',
    url: '/admin/allUserList',
    params
  })
}

export const allAllUserTokenList = params => {
  return request({
    method: 'GET',
    url: '/admin/allUserTokenList',
    params
  })
}
