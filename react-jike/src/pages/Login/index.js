import { Card, Form, Input, Button, Checkbox } from 'antd'
import './index.scss'

const Login = () => {
    const onFinish = (values) =>{
        console.log(values);    
    }
    return (
        <div className="login">
            <Card className="login-container">
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '手机号不能为空',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号格式不正确',
                            }
                        ]}>
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item name="code"
                        rules={[
                            {
                                required: true,
                                message: '验证码不能为空',
                            },
                        ]}>
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ color: 'red', backgroundColor: 'pink' }} type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login