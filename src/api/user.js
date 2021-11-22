import request from '@/utils/request.js'

export const login = (user) => {
  return request({
    method: 'POST',
    url: '/admin/login',
    params: user
  })
}

export const getUserinfo = () => {
  return request({
    method: 'GET',
    url: '/admin/getuserinfo'
  })
}

export const signout = () => {
  return request({
    method: 'GET',
    url: '/admin/signout'
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
