import React from 'react'
import styles from './index.module.scss'
import { useParams } from 'react-router-dom'



function Edit() {
  let params = useParams()
  console.log(params);

  return (
    <div className={styles.edit}>

    </div>
  )
}

export default Edit