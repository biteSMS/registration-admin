import axios from 'axios'
import data from './mock'

// const baseURL = `http://957427771.natapp1.cc`
const baseURL = `http://localhost:3001`

export const getContent = () => {
  return new Promise(resolved => {
    resolved(data)
  })
}

export const getCurrentMembers = async () => {
  let res = await getContent()
  let list = res.data
  let members = []
  list.map(e => {
    return members = members.concat(e.members)
  })
  console.log(members)
  return members
}

export const sendMessage = data =>
  axios({
    method: 'POST',
    url: '/message',
    baseURL,
    data
  })

export const Login = params =>
  axios({
    method: 'POST',
    url: '/login',
    baseURL,
    params
  })