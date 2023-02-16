import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import styles from './index.module.scss'

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.children}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout