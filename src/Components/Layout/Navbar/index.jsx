import { TwitterOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styles from './index.module.scss'

function Navbar() {
  const {userData} = useSelector(state => state)
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const classes = [styles.menu, isMenuOpen && styles.OpenMenu].join(" ")
  const classes2 = [styles.close, isMenuOpen && styles.NotClose].join(" ")

  return (
    <div className={styles.navbar}>
      <h1><TwitterOutlined /></h1>
      <div onClick={() => setIsMenuOpen(false)} className={classes2}></div>
      <div className={classes}>
        <div className={styles.userInfo}>
          {
            userData?.userPhoto ? <img title={userData?.name} src={userData?.userPhoto} alt="" /> : "Guest"
          }
          <h5>{userData?.name}</h5>
          <h5>{userData?.email}</h5>
        </div>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/posts">Posts</NavLink></li>
          <li><NavLink to="/createProduct">Write a Post</NavLink></li>
        </ul>
      </div>
      <div>
        {
          userData?.userPhoto ? <img  title={userData?.name} src={userData?.userPhoto} onClick={() => setIsMenuOpen(true)} alt="" /> : <h4 onClick={() => setIsMenuOpen(true)}>Guest</h4>
        }
      </div>
    </div>
  )
}

export default Navbar