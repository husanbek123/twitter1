import React, { useLayoutEffect, useState } from 'react'
import styles from './index.module.scss'
import Post from '../../Components/Post' 

import {db} from '../../Config/firebase'
import {getDocs, collection, doc, deleteDoc, onSnapshot} from 'firebase/firestore'


function MyPosts() {
  let [posts, setPosts] = useState([])
  let postsCollection = collection(db, 'posts')
  
  async function Get() {
    let arr = []
    let data = await getDocs(postsCollection)
    const realData = data.docs.map((doc) => arr.push(...posts, {...doc.data(), id: doc.id}))
    setPosts(arr)
  }

  
  useLayoutEffect(() => {
    onSnapshot(postsCollection, () => {
      Get()
    })
  }, [])

  
  


  return (
    <div className={styles.myPosts}>
      {
        posts.length == 0 ?
        <h2>No Posts</h2>
        :
        <div className={styles.posts}>
          {
            posts?.map(post => 
              <Post 
                title={post.title}
                text={post.text}
                img={post.user?.userPhoto}
                type="simple"
                id={post.id}
                publisher={post.user?.name}
                count={post?.comments?.length !== undefined ? post.comments.length : 0}
              />
              
              // <div>
              //   <h3>{post.title}</h3>
              //   <p>{post.text}</p>
              //   <button onClick={() => Delete(post.id)}>Delete</button>
              // </div>
            )
          }
        </div>
      }
    </div>
  )
}

export default MyPosts