import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from "./pages/About"
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import PrivateRoute from './components/PrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute copy'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import Search from './pages/Search'
import Layout from './layouts/Layout'


const App = () => {
  return (
    <BrowserRouter>
      <Layout>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/search' element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:postId' element={<UpdatePost />} />
          </Route>
          <Route path='/projects' element={<Projects />} />
          <Route path='/post/:postSlug' element={<PostPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App