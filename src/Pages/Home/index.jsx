import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { instance } from '../../Utils/axiosInstance'
import { setPosts } from '../../index'
import Post from '../../Components/Post'
import SearchBox from '../../Components/SearchBox'

import { db } from '../../Config/firebase'
import { collection , addDoc, } from 'firebase/firestore'


function Home() {

  let postsData = collection(db, 'posts')

  

  let [isLoading, setIsLoading] = useState(true)
  const {posts, filteredArr} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    instance.get("/posts")
    .then((data) => {
      dispatch(setPosts(data.data))
      setIsLoading(false)
    })
  }, [])


    function Arr() {
      return <div className={styles.notFound}>Not Found</div>
    }
  

  return (
    <div className={styles.home}>
      <SearchBox />
      <br />
      <div className={styles.posts}>
      {
        filteredArr.length !== 0 ?
          filteredArr?.map((post, index) => 
            <Post 
              title={post.title}
              text={post.body}
              index={index}
              isLoading={isLoading}
            />
          )
        :
        posts.map((post, index) => 
          <Post 
            title={post.title}
            text={post.body}
            index={index}
            isLoading={isLoading}
          />
        )
      }
      </div>
    </div>
  )
}

export default Home