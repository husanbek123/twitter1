import React, { useState } from 'react'
import styles from './index.module.scss'
import { db } from '../../Config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { Button, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CreatePost() {
  const navigate = useNavigate()  
  let {userData} = useSelector(state => state)

  let [inputsData, setInputsData] = useState({
    text: null,
    title: null
  })

  let posts = collection(db, 'posts')

  async function PublishPost() {
    console.log(inputsData);
    if(inputsData.text == null || inputsData.title == null) {
      return
    }
    else {
      await addDoc(posts, {
        ...inputsData, 
        user: userData,
        comments: []
      })
      navigate('/posts')
    }
  }


  return (
    <div className={styles.createPost}>
      <h2>Write a Post</h2>
      <p>The post will be showed to other users!</p>
      <br />
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input minLength={2} placeholder='Enter the title of your post' type="text" onChange={(e) => setInputsData({...inputsData, title: e.target.value})} required />
          <TextArea minLength={6} placeholder='Enter your ideas and text' type="text" onChange={(e) => setInputsData({...inputsData, text: e.target.value})} required />
          <Button type='primary' onClick={PublishPost}>Publish</Button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost