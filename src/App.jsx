import './App.css'
import ForgotPassword from './error/forgotpassword'
import NotFound from './error/notfound'
import Main from './pages/main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatApp from './pages/user'
import SignIn from './components/signin'
import SignUp from './components/signup'


function App() {
  return (
      
        <BrowserRouter>
         <Routes>
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path='/dashboard' element={ <ChatApp/>}/>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/signin" element={< SignIn />}/>
          <Route path="/signup" element={ <SignUp/> }/>
         </Routes>
        </BrowserRouter>
      
  )
}

export default App
