import axios from 'axios'

const baseURL = `http://957427771.natapp1.cc`

// export const getContent = () => {
//   return new Promise(resolved => {
//     resolved(data)
//   })
// }

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
  console.log(members)
  return members
}

export const sendMessage = data =>
  axios({
    method: 'POST',
    url: '/message',
    baseURL,
    data,
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