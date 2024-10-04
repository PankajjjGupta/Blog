import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { UnprotectedRoutes } from './components/UnprotectedRoutes'
import { RecoilRoot } from 'recoil'
import { Landing } from './components/Landing'


function App() {
  return (
    <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/signin' element={<UnprotectedRoutes><Signin /></UnprotectedRoutes>} />
            <Route path='/signup' element={<UnprotectedRoutes><Signup /></UnprotectedRoutes>} />
            <Route path='/blog/:id' element={<ProtectedRoutes><Blog /></ProtectedRoutes>} />
            <Route path='/blogs' element={<ProtectedRoutes><Blogs /></ProtectedRoutes>} />
            <Route path='/publish' element={<ProtectedRoutes><Publish /></ProtectedRoutes>} />
            <Route path='/' element={<Landing />}></Route>
          </Routes>
        </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
