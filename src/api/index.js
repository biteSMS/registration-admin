import axios from 'axios'
import data from './mock'

const baseURL = ``

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