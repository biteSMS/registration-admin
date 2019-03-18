import React, { useState, useEffect } from 'react'
import { getCurrentMembers } from '../../api'
import { PushForm } from './PushForm'
import {
  Table,
  Button
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

export const Push = () => {
  const [data, setData] = useState([])
  const [selectedStu, setSelectedStu] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentMembers().then(res => {
      setData(res)
      setLoading(false)
    })
  }, [])

  const onClose = () => setVisible(false)
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
        selectedStu={selectedStu}
      />
    </>
  )
}