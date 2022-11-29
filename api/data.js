import axios from './axios'

export const getStatic = (data) => {
  return axios.request({
    url: '/homeApi/getStatic',
    method: 'post',
    data: data
  })
}


export const getUser = (params) => {
  // 返回用户列表
  // console.log(params, 'params')
  return axios.request({
    url: '/api/user/getUser/',
    method: 'get',
    data: params
  })
}
export const addUser = (data) => {
  return axios.request({
    url: '/api/user/add',
    method: 'post',
    data: data
  })
}
export const editUser = (data) => {
  return axios.request({
    url: '/api/user/edit',
    method: 'post',
    data: data
  })
}
export const delUser = (data) => {
  return axios.request({
    url: '/api/user/del',
    method: 'post',
    data: data
  })
}

export const getMenu = (data) => {
  return axios.request({
    url: '/api/permission/getMenu',
    method: 'post',
    data: data
  })
}


