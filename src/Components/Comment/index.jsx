import React from 'react'
import styles from './index.module.scss'

function Comment({comment}) {
  return (
    <div className={styles.comment}>
      <div className={styles.img}>
        <img src={comment.userPhoto} alt="" />
      </div>
      <div>
        <h3>{comment.name}</h3>
        <p>{comment.text}</p>
      </div>
    </div>
  )
}

export default Comment