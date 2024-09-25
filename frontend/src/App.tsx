import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Landing } from './pages/Landing'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { UserBlog } from './pages/UserBlog'
import { EditBlog } from './pages/EditBlog'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/get-blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add-new-blog" element={<Publish/>} />
          <Route path="/user-blogs" element={<UserBlog/>} />
          <Route path="/edit-blog/:id" element={<EditBlog/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App