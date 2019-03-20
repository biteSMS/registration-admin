import React, { useState } from 'react'
import { sendMessage } from '../../api'
import {
  Drawer,
  Input,
  Row,
  Col,
  Button
} from 'antd'

const getStuids = stuArr => {
  let arr = []
  stuArr.map(e => arr.push(e.stuid))
  return arr
}

export const PushForm = (props) => {
  const [template, setTemplate] = useState('')
  const [school, setSchool] = useState('')
  const [role, setRole] = useState('')
  const [time, setTime] = useState('')
  const [content, setContent] = useState('')
  const [remark, setRemark] = useState('')

  const onClose = () => props.onClose()

  return (
    <Drawer
      title="消息推送"
      width={650}
      visible={props.visible}
      onClose={onClose}
    >
      <Row style={{ marginBottom: 20 }}>
        <Col>
          标题
          <Input
            style={{ marginTop: 8 }}
            allowClear
            onChange={e => setTemplate(e.target.value)}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          学校
          <Input
            style={{ marginTop: 8 }}
            allowClear
            onChange={e => setSchool(e.target.value)}
          />
        </Col>
        <Col span={12}>
          通知人
          <Input
            style={{ marginTop: 8 }}
            allowClear
            onChange={e => setRole(e.target.value)}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          描述
          <Input.TextArea
            style={{ marginTop: 8 }}
            autosize={{ minRows: 4, maxRows: 4 }}
            onChange={e => setContent(e.target.value)}
          />
        </Col>
        <Col span={12}>
          remark
          <Input.TextArea
            style={{ marginTop: 8 }}
            autosize={{ minRows: 4, maxRows: 4 }}
            onChange={e => setRemark(e.target.value)}
          />
        </Col>
      </Row>
      <Row gutter={16} type="flex" align="bottom">
        <Col span={12}>
          时间
          <Input
            style={{ marginTop: 8 }}
            allowClear
            onChange={e => setTime(e.target.value)}
          />
        </Col>
        <Col span={12} push={4}>
          <Button
            type="primary"
            icon="wechat"
            onClick={() => {
              let stuids = JSON.stringify(getStuids(props.selectedStu))
              let sendData = {
                stuids,
                template,
                school,
                role,
                time,
                content,
                remark
              }
              console.log(sendData)
              sendMessage(sendData).then(res => {
                console.log(res)
              })
            }}
          >确认推送</Button>
        </Col>
      </Row>
    </Drawer>
  )
}