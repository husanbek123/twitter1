import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './index.module.scss'
import { auth, provider } from '../../Config/firebase';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserLoggedIn, setUserData } from '../../index';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};



const Login = () => {
    let dispatch = useDispatch()
    let {usersData} = useSelector(state => state)
    let navigate = useNavigate()
    let cookie = new Cookies()
    
    let signInWithGoogle = async () => {
        await signInWithRedirect(auth, provider).finally(data => console.log(data))
    }

    useEffect(() => {
        let getUserData = async () => {
            let result = await getRedirectResult(auth)
            console.log(result);
            if(result) {
                dispatch(setIsUserLoggedIn())
                dispatch(setUserData({
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    userPhoto: result?.user?.photoURL
                }))
                cookie.set('auth-token', result.user.refreshToken)
                navigate('/posts')
            }
        } 
        getUserData()
    }, [])
    
    return (
        <div className={styles.login}>
            <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
            <h2>You Must Log In</h2>
            <br /><br />

            <Form.Item
                label="Username"
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input placeholder='Enter username' />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password placeholder='Enter password' />
            </Form.Item>

            <div className={styles.btns}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button 
                    className={styles.signInWithGoogle}
                    onClick={signInWithGoogle}
                >
                    Sign in with 
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" />
                </Button>
            </div>
            </Form>
        </div>
    )
}
export default Login
