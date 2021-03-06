import axios from 'axios'
import Qs from 'qs'

const baseURL = `https://wx.idsbllp.cn/match/`

export const getContent = () =>
  axios({
    method: 'POST',
    url: '/content',
    baseURL,
    headers: {
      jwt: window.sessionStorage.getItem('jwt')
    }
  })
  .then(res => {
    return res.data
  })

export const getCurrentMembers = async () => {
  let res = await getContent()
  let list = res.data
  let members = []
  list.map(e => {
    return members = members.concat(e.members)
  })
  return members
}

export const sendMessage = data =>
  axios({
    method: 'POST',
    url: '/message',
    baseURL,
    data: Qs.stringify(data),
    headers: {
      jwt: window.sessionStorage.getItem('jwt')
    }
  })

export const Login = params =>
  axios({
    method: 'POST',
    url: '/login',
    baseURL,
    params
  })

export const cancel = data =>
  axios({
    method: 'POST',
    url: '/cancel',
    baseURL,
    data: Qs.stringify(data),
    headers: {
      jwt: window.sessionStorage.getItem('jwt')
    }
  })