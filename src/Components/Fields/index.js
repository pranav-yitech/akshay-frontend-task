import { Input, Select, Row, Col, Form, Button } from "antd"
import { DatePicker } from "antd";
import moment from "moment"
import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const FieldsComponents = ({
  dataSourceOld,
  setDataSourceNew,
  applicationTypeOption,
  actionTypeOption,
}) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onSubmit = (value) => {
    let filterOld = dataSourceOld
    let filterNew = []

    if (value.logId) {
      filterNew = filterOld.filter((d) => {
        if (d?.logId?.toString() === value?.logId) {
          return d?.logId?.toString() === value?.logId
        } else if (d?.logId?.toString().includes(value?.logId)) {
          return d?.logId?.toString().includes(value?.logId)
        }
      })
    }

    if (value.actionType) {
      filterNew = filterOld.filter((d) => {
        return d?.actionType === value?.actionType
      })
    }

    if (value.applicationType) {
      filterNew = filterOld.filter((d) => {
        return d?.applicationType === value?.applicationType
      })
    }

    if (value.formDate && value.toDate) {
      let start = moment(value.formDate.$d).format("YYYY-MM-DD")
      let end = moment(value.toDate.$d).format("YYYY-MM-DD")
      var startDate = new Date(start)
      var endDate = new Date(end)
      filterNew = filterOld.filter((a) => {
        var date = new Date(a.creationTimestamp)
        return date >= startDate && date <= endDate
      })
    }

    if (value.applicationId) {
      filterNew = filterOld.filter((d) => {
        if (d?.applicationId?.toString() === value?.applicationId) {
          return d?.applicationId?.toString() === value?.applicationId
        } else if (
          d?.applicationId?.toString().includes(value?.applicationId)
        ) {
          return d?.applicationId?.toString().includes(value?.applicationId)
        }
      })
    }
    setDataSourceNew(filterNew)
    navigate(
      `${pathname}?logId=${value.logId}?actionType=${value.actionType}?applicationType=${value.applicationType}?formDate=${value.formDate}?toDate=${value.toDate}?applicationId=${value.applicationId}`
    )
  }

  useEffect(() => {
    navigate(pathname)
  }, [])

  return (
    <div className="fields-wrapper">
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Row gutter={[16, 16]} align="bottom">
          <Col span={3}>
            <Form.Item name="logId" label="Log ID">
              <Input name="logId" placeholder="e.g. Admin.User" />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="actionType" label="Action Type">
              <Select
                name="actionType"
                placeholder="select"
                allowClear
                options={actionTypeOption}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="applicationType" label="Application Type">
              <Select
                name="applicationType"
                placeholder="select"
                allowClear
                options={applicationTypeOption}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="formDate" label="Form Date">
              <DatePicker name="formDate" placeholder="Select Date" />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="toDate" label="To Date">
              <DatePicker
                superNextIcon
                name="toDate"
                placeholder="Select Date"
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="applicationId" label="Application Id">
              <Input name="applicationId" placeholder="e.g. 219822/2021" />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="" label="">
              <Button htmlType="submit" type="primary">
                Search Logger
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default FieldsComponents
