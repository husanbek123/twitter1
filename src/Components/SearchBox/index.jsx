// import MyAutoComplete from '../AutoComplete/'
import React from 'react'
import styles from './index.module.scss';
import { AutoComplete } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';
import { setFilteredArr } from '../../index';


const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});


export const MyAutoComplete = () => {

  let {posts, filteredArr} = useSelector(state => state)
  let dispatch = useDispatch()


  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);


  const onSearch = (searchText) => {
    setOptions(
    //   !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
      posts?.filter(post => post.title.startsWith(searchText)).map(post => ({value: post.title}))
    );
  };
  const onSelect = (data) => {
    console.log('onSelect', data);
  };
  const onChange = (data) => {
    setValue(data);
  };

  function Sort() {
    dispatch(setFilteredArr(posts.filter(post => post.title.startsWith(value))))
    console.log(filteredArr);
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <AutoComplete
          options={options}
          style={{
            width: 200,
          }}
          onSelect={onSelect}
          onSearch={onSearch}
          placeholder="Enter title of post"
          className='InputDiv'
          onChange={onChange}
        />
        <Tooltip title="search">
          <Button type="primary" onClick={Sort} shape="default" icon={<SearchOutlined />} />
        </Tooltip>
      </form>

      {/* <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="control mode"
      /> */}
    </>
  );
};


function SearchBox() {
  return (
    <div className={styles.searchBox}>
      <MyAutoComplete />
    </div>
  )
}

export default SearchBox