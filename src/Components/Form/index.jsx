import React from 'react'
import styles from './index.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';



const Form = ({type}) => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  if(type == "login") {

    return (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
            <Form.Item
            name="email"
            rules={[
                {
                required: true,
                message: 'Please input your email!',
                },
            ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your Password!',
                },
            ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox onChange={(e) => console.log(e)}>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>
    
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
    );
  }
  else {

  }
};
export default Form;



