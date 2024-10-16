import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'

import { Table, Tag, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assects/myWife.jpg'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { DeleteArticleAPI, GetArticleListAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {

    const nagivate = useNavigate()

    const { channelList } = useChannel()

    //文章状态 枚举
    const status = {
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="success">审核通过</Tag>
    }

    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => status[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => nagivate(`/publish?id=${data.id}`)} />
                        <Popconfirm
                            title="确认删除该条文章吗?"
                            onConfirm={() => onConfirm(data)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    //查询文章参数
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 5
    })

    //获取文章列表
    const [list, setList] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getList() {
            const res = await GetArticleListAPI(reqData)
            setList(res.data.data.results)
            setCount(res.data.data.total_count)
        }
        getList()
    }, [reqData])

    //筛选文章
    const onFinish = (formValue) => {
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            status: formValue.status,
            begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date[1].format('YYYY-MM-DD'),
        })
    }

    //分页
    const onPageChange = (page) => {
        setReqData({
            ...reqData,
            page
        })
    }

    //删除
    const onConfirm = async (data) => {
        await DeleteArticleAPI(data.id)
        setReqData({
            ...reqData
        })
    }

    return (
        <div>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/home">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                    </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: null }} onFinish={onFinish}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={null}>全部</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            defaultValue="选择频道"
                            style={{ width: 120 }}
                        >
                            {channelList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/*显示区域*/}
            <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={list} pagination={{
                    total: count,
                    pageSize: reqData.per_page,
                    onChange: onPageChange
                }} />
            </Card>
        </div>
    )
}

export default Article