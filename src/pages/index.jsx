import { useAddUserMutation, useDeleteUserByIdMutation, useGetUsersQuery, useEditUserByIdMutation } from "@/redux/Slicer/slice.user"
import { Button, DatePicker, Form, Input, InputNumber, message, Modal, Select, Spin, Switch, Table, Tag } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

function FormComponent() {
  const [addUser, { isLoading }] = useAddUserMutation()
  const [form] = Form.useForm()
  const handleSubmit = (values) => {
    addUser(values).unwrap().then(res => {
      message.success("User Added")
      form.resetFields()
    }).catch(err => {
      console.log(err)
      message.error("Failed to new add user")
    })
  }

  return (
    <div style={{ maxWidth: 480, margin: "50px auto 100px auto" }}>
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} form={form} onFinish={handleSubmit}>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select
            placeholder="Select gender"
            allowClear
            options={[
              {
                value: "MALE",
                label: "Male"
              },
              {
                value: "FEMALE",
                label: "Female"
              }
            ]} />
        </Form.Item>
        <Form.Item label="Birth" name="birth">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Experience" name="experience">
          <InputNumber min={0} step={1} />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>Submit</Button>
        </div>
      </Form>
    </div>
  )
}

function TableComponent({ setIsModalOpen, setDataView }) {
  const { data, isLoading } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserByIdMutation()
  const handleDelete = (id) => {
    deleteUser(id).unwrap().then(res => message.success("User Deleted")).catch(err => message.error("Failed to delete user"))
  }
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "30%"
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      width: "15%"
    },
    {
      title: "Birth",
      key: "birth",
      dataIndex: "birth",
      width: "25%"
    },
    {
      title: "Experience",
      key: "experience",
      dataIndex: "experience",
      width: "15%"
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: "15%",
      render: (value, record) => {
        return <>
          <Tag color="blue" style={{ cursor: "pointer" }} onClick={() => {
            setIsModalOpen(true)
            setDataView(record)
          }}>EDIT</Tag>
          <Tag color="red" style={{ cursor: "pointer" }} onClick={() => handleDelete(record.id)}>DELETE</Tag>
        </>
      }
    }
  ]
  return (
    <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} loading={isLoading} />
  )
}

function ModalEdit({ isModalOpen, setIsModalOpen, setDataView, dataView }) {
  const [form] = Form.useForm()
  const [updateUser, { isLoading }] = useEditUserByIdMutation()
  const handleCancle = () => {
    setIsModalOpen(false)
  }
  const handleSubmit = (values) => {
    updateUser({
      ...values,
      id: dataView.id
    }).unwrap().then(res => {
      message.success("User updated")
      setIsModalOpen(false)
      setDataView(null)
    }).catch(err => {
      console.log(err)
      message.error("Failed to update user")
    })
  }
  useEffect(() => {
    form.setFieldsValue({
      ...dataView,
      birth: dayjs(dataView?.birth, "YYYY-DD-MM")
    })
  }, [isModalOpen])
  return <>
    <Modal
      title="EDIT USER"
      open={isModalOpen} closable={false} onCancel={handleCancle} onOk={() => form.submit()}>
      <Spin spinning={isLoading}>
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} form={form} onFinish={handleSubmit}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Select
              placeholder="Select gender"
              allowClear
              options={[
                {
                  value: "MALE",
                  label: "Male"
                },
                {
                  value: "FEMALE",
                  label: "Female"
                }
              ]} />
          </Form.Item>
          <Form.Item label="Birth" name="birth">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Experience" name="experience">
            <InputNumber min={0} step={1} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  </>
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataView, setDataView] = useState(null)
  return (
    <>
      <div style={{ maxWidth: 1580, margin: "0 auto" }}>
        <FormComponent />
        <TableComponent setIsModalOpen={setIsModalOpen} setDataView={setDataView} />
        <ModalEdit setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} dataView={dataView} setDataView={setDataView} />
      </div>
    </>
  )
}
