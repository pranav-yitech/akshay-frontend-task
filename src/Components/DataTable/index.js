import React, { useEffect, useState } from "react"
import { Table } from "antd"
import axios from "axios"
import FieldsComponents from "../Fields"
import Breadcrumbs from "../../CommonComponents/Breadcrumbs"

const DataTable = () => {
  const [dataSourceNew, setDataSourceNew] = useState([])
  const [dataSourceOld, setDataSourceOld] = useState([])
  const [applicationTypeOption, setApplicationTypeOption] = useState([])
  const [actionTypeOption, setActionTypeOption] = useState([])

  const columns = [
    {
      title: "Log ID",
      dataIndex: "logId",
      onFilter: (value, record) => record.name.startsWith(value),
      sorter: (a, b) => a.logId - b.logId,
    },
    {
      title: "Application Type",
      dataIndex: "applicationType",
      render: (applicationType) =>
        applicationType ? (
          applicationType
        ) : (
          <span className="emptyData">-/-</span>
        ),
      sorter: (a, b) => a?.applicationType?.localeCompare(b?.applicationType),
    },
    {
      title: "Application ID",
      dataIndex: "applicationId",
      render: (applicationId) =>
        applicationId ? applicationId : <span className="emptyData">-/-</span>,
      sorter: (a, b) => a.applicationId - b.applicationId,
    },
    {
      title: "Action",
      dataIndex: "actionType",
      render: (actionType) =>
        actionType ? actionType : <span className="emptyData">-/-</span>,
      sorter: (a, b) => a?.actionType?.localeCompare(b?.actionType),
    },
    {
      title: "Action Details",
      dataIndex: "actionDetails",
      render: (actionDetails) =>
        actionDetails ? actionDetails : <span className="emptyData">-/-</span>,
      sorter: (a, b) => a.actionDetails - b.actionDetails,
    },
    {
      title: "Date : Time",
      dataIndex: "creationTimestamp",
      render: (creationTimestamp) =>
        creationTimestamp ? (
          creationTimestamp
        ) : (
          <span className="emptyData">-/-</span>
        ),
      sorter: (a, b) =>
        new Date(a.creationTimestamp) - new Date(b.creationTimestamp),
    },
  ]

  const baseURL = "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"

  const getData = async () => {
    await axios
      .get(baseURL)
      .then((response) => {
        if (response.data.success) {
          //table data
          setDataSourceNew(response.data.result.auditLog)
          setDataSourceOld(response.data.result.auditLog)

          //application type option
          const uniqueApplicationType = [
            ...new Set(
              response.data.result.auditLog.map((item) => item.applicationType)
            ),
          ]
          const applicationTypeTemp = []
          uniqueApplicationType?.map((d, i) => {
            if (d) {
              applicationTypeTemp.push({
                value: d,
                label: d,
              })
            }
          })
          setApplicationTypeOption(applicationTypeTemp)

          //action type option
          const uniqueActionType = [
            ...new Set(
              response.data.result.auditLog.map((item) => item.actionType)
            ),
          ]
          const actionTypeTemp = []
          uniqueActionType?.map((d, i) => {
            if (d) {
              actionTypeTemp.push({
                value: d,
                label: d,
              })
            }
          })
          setActionTypeOption(actionTypeTemp)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const onTableChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra)
  }

  return (
    <>
      <Breadcrumbs />
      <FieldsComponents
        setDataSourceNew={setDataSourceNew}
        dataSourceNew={dataSourceNew}
        dataSourceOld={dataSourceOld}
        applicationTypeOption={applicationTypeOption}
        actionTypeOption={actionTypeOption}
      />
      <Table
        columns={columns}
        dataSource={dataSourceNew}
        onChange={onTableChange}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
    </>
  )
}

export default DataTable
