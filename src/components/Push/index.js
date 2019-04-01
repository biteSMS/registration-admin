import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { getCurrentMembers, cancel } from "../../api"
import { PushForm } from "./PushForm"
import { Table, Button, message, Modal } from "antd"

const columns = [
  {
    title: "队伍名称",
    dataIndex: "team"
  },
  {
    title: "职任",
    dataIndex: "role"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "学号",
    dataIndex: "stuid"
  },
  {
    title: "学院",
    dataIndex: "college"
  },
  {
    title: "联系电话",
    dataIndex: "phone"
  },
  {
    title: "指导老师",
    dataIndex: "teacher"
  },
  {
    title: "状态栏",
    dataIndex: "elect",
    render: status => {
      let color = "rgba(0, 0, 0, 0.65)"
      if (status === "已发送") color = "#176bf7"
      if (status === "发送失败") color = "#ff4f4f"
      return <span style={{ color }}>{status}</span>
    }
  }
]

const PushI = ({ history }) => {
  const [data, setData] = useState([])
  const [selectedStu, setSelectedStu] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

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
        message.error("身份验证错误，请重新登陆！")
        history.push("/login")
      })
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedStu(selectedRows)
    }
  }
  const getStuids = stuArr => {
    let arr = []
    stuArr.map(e => arr.push(+e.stuid))
    return arr
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 10
        }}
      >
        已选择{selectedStu.length}个人
        <Button
          type="danger"
          icon="delete"
          style={{ marginLeft: 12 }}
          onClick={() => setModalVisible(true)}
        >
          删除队员
        </Button>
        <Button
          type="primary"
          icon="wechat"
          style={{ marginLeft: 12 }}
          onClick={() => setVisible(true)}
        >
          消息推送
        </Button>
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
      <Modal
          title="Basic Modal"
          visible={modalVisible}
          onOk={() => {
            let stuids = JSON.stringify(getStuids(selectedStu))
            let sendData = {
              stuids: stuids
            }
            cancel(sendData)
              .then(res => {
                console.log(res)
                if (res.data.status === 200) {
                  message.success('删除成功！')
                  getData()
                  setModalVisible(false)
                } else {
                  message.error('删除失败！')
                }
              })
              .catch(err => {
                message.error('删除失败！')
              })
          }}
          onCancel={() => {
            setModalVisible(false)
          }}
        >
          <p>真的确定要删除选择队员吗？</p>
          <p>如果要修改队伍中某一队员的信息，建议删除整个队伍的队员后重新填写整个队伍的报名信息。</p>
        </Modal>
    </>
  )
}

const Push = withRouter(PushI)

export { Push }
