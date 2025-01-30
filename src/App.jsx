import './App.css'
import NotFound from './error/notfound'
import Main from './pages/main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
      
        <BrowserRouter>
         <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound/>} />
         </Routes>
        </BrowserRouter>
      
  )
}

export default App
