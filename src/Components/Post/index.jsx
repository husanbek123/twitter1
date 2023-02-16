import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Skeleton, Switch } from 'antd';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss'

const { Meta } = Card;


const Post = ({title, text, publisher, index, isLoading, img, id, type, count}) => {

  if(type == 'simple') {
    return (
      <Link to={`/posts/${id}`}>
        <Card
          key={index}
          style={{
            width: 300,
            marginTop: 16,
          }}
          loading={isLoading}
          className={styles.card}
        >
          <div className={styles.count}>{count}</div>
          <Meta
            avatar={<img src={img} /> }
            title={<div><h5>{publisher}</h5> {title} </div>}
            description={text}
          />
          {/* <Button type='primary'>Delete</Button> */}
        </Card>
      </Link>
    )
  }
  else {
    return (
      <>
        <Card
          key={index}
          style={{
            width: 300,
            marginTop: 16,
          }}
          loading={isLoading}
          className={styles.card}
        >
          <Meta
            title={title}
            description={text}
          />
        </Card>
      </>
    );
  }
  
};
export default Post;