import React from 'react'
import { Redirect } from 'react-router-dom'
import { Push } from '../../components'
import {
  Layout
} from 'antd'

const { Header, Content, Footer } = Layout

export const Admin = () => {
  
  if (!window.sessionStorage.getItem('jwt')) return (<Redirect to='/login' />)

  return (
    <>
      <Layout>
        <Header >
          <div style={{ color: '#fff', fontSize: 18, marginLeft: 30 }}>第二届电子设计创新挑战赛后台管理系统</div>
        </Header>
        <Content style={{ padding: '40px 80px 0 80px' }}>
          <div style={{ background: '#fff', padding: '10px 30px 30px 30px', minHeight: 580 }}>
            <Push />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©红岩网校工作站</Footer>
      </Layout>
    </>
  )
}