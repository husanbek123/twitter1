import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));


const AppStates = createSlice({
  name: "AppStates",
  initialState: {
    isThemeDark: false,
    posts: [],
    isUserLoggedIn: false,
    filteredArr: [],
    userData: null
  },

  reducers: {
    changeTheme: (state) => {
      state.isThemeDark = !state.isThemeDark
    },
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    setIsUserLoggedIn: (state) => {
      state.isUserLoggedIn = !state.isUserLoggedIn 
    },
    setFilteredArr: (state, action) => {
      state.filteredArr = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    }
  }
})

export const {changeTheme, setIsUserLoggedIn, setPosts, setFilteredArr, setUserData} = AppStates.actions

export const store = configureStore({
  reducer: AppStates.reducer
})

store.subscribe(() => console.log(store.getState()))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
