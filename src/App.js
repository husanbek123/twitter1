import Layout from './Components/Layout'
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import CreateProduct from './Pages/CreatePost';
import Home from './Pages/Home';
import Posts from './Pages/MyPosts';
import ProtectedRoute from './Utils/ProtectedRoute';
import Login from './Pages/Login';
import PostDetailed from './Pages/PostDetailed/index';
import Edit from './Pages/Edit';


function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/twitter1' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/posts' element={<ProtectedRoute><Posts /></ProtectedRoute>} />
          <Route path='/posts/:postId' element={<ProtectedRoute><PostDetailed /></ProtectedRoute>} />
          <Route path='/posts/:postId:edit' element={<ProtectedRoute><Edit /></ProtectedRoute>} />
          <Route path='/createProduct' element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
