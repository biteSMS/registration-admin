import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getCurrentMembers } from '../../api'
import { PushForm } from './PushForm'
import {
  Table,
  Button,
  message
} from 'antd'

const columns = [
  {
    title: '队伍名称',
    dataIndex: 'team'
  },
  {
    title: '职任',
    dataIndex: 'role'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '学号',
    dataIndex: 'stuid'
  },
  {
    title: '学院',
    dataIndex: 'college',
  },
  {
    title: '联系电话',
    dataIndex: 'phone'
  },
  {
    title: '指导老师',
    dataIndex: 'teacher'
  },
  {
    title: '状态栏',
    dataIndex: 'elect',
    render: status => {
      let color = 'rgba(0, 0, 0, 0.65)'
      if (status === '已发送') color = '#176bf7'
      if (status === '发送失败') color = '#ff4f4f'
      return (<span style={{ color }}>{status}</span>)
    }
  }
]

const PushI = ({ history }) => {
  const [data, setData] = useState([])
  const [selectedStu, setSelectedStu] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const onClose = () => setVisible(false)
  const getData = () => {
    getCurrentMembers()
    .then(res => {
      setData(res)
      setLoading(false)
    })
    .catch(err => {
      message.error('身份验证错误，请重新登陆！')
      history.push('/login')
    })
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedStu(selectedRows)
    }
  }

  return(
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center',marginBottom: 10 }}>
        已选择{selectedStu.length}个人
        <Button
          type="primary"
          icon="wechat"
          style={{ marginLeft: 12 }}
          onClick={() => setVisible(true)}
        >消息推送</Button>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey={record => record.id}
        rowSelection={rowSelection}
        pagination={100}
      />
      <PushForm
        visible={visible}
        onClose={onClose}
        onPush={getData}
        selectedStu={selectedStu}
      />
    </>
  )
}

const Push = withRouter(PushI)

export { Push }