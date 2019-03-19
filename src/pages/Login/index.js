import React from 'react'
import { LoginForm } from '../../components/LoginForm'

export const Login = () => {
  return (
    <div style={{
      position: 'fixed',
      display: 'flex',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#EBEBEB'
      }}
    >
      <LoginForm />
    </div>
  )
}