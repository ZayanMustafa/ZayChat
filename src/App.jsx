import './App.css'
import ForgotPassword from './error/forgotpassword'
import NotFound from './error/notfound'
import Main from './pages/main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatApp from './pages/user'

function App() {
  return (
      
        <BrowserRouter>
         <Routes>
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/dashboard" element={<ChatApp/>} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound/>} />
         </Routes>
        </BrowserRouter>
      
  )
}

export default App
