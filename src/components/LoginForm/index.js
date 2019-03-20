import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Login } from '../../api'
import {
  Input,
  Button,
  Icon,
  message
} from 'antd'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{
      width: '360px',
      height: '260px',
      background: '#fff',
      borderRadius: 10,
      boxShadow: 'rgba(26, 26, 26, 0.1) 0px 0px 5px 0px',
      display: 'flex',
      alignItems: 'center',
      flexFlow: 'column'
    }}
    >
      <span style={{ marginTop: 30, fontSize: 18 }}>比赛报名后台管理系统</span>
      <Input
        style={{ width: '64%', marginTop: 20 }}
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="用户名"
        onChange={e => {
          setUsername(e.target.value)
        }}
      />
      <Input
        style={{ width: '64%', marginTop: 15 }}
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        placeholder="密码"
        onChange={e => {
          setPassword(e.target.value)
        }}
      />
      <Button
        style={{ width: '64%', marginTop: 25 }}
        type="primary"
        onClick={() => {
          if (username === '' || password === '') return message.error('用户名或密码不能为空！')
          let params = {
            username,
            password
          }
          Login(params)
            .then(res => {
              let status = res.data.status
              if (status === 200) {
                window.sessionStorage.setItem('jwt', res.headers.jwt)
                console.log(res)
                // return props.history.push("/")
              }
            })
        }}
      >登陆</Button>
    </div>
  )
}

export default withRouter(LoginForm)