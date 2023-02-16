import { AutoComplete } from 'antd';
import { useState } from 'react';
import styles from './index.module.scss'

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const MyAutoComplete = () => {

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    setOptions(
    //   !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],

    );
  };
  const onSelect = (data) => {
    console.log('onSelect', data);
  };
  const onChange = (data) => {
    setValue(data);
  };

  return (
    <>
      <AutoComplete
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="input here"
      />
      <br />
      <br />
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
export default MyAutoComplete;