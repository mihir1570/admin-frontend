import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/sidebar';
import Inquiry from './components/Inquiry';
import Getintouch from './components/Getintouch';
import Joinourteam from './components/Joinourteam';
import Cpartner from './components/Cpartner';
import Contact from './components/Contact';
import Pdf from './components/Pdf';
import Forgotpassword from './components/Forgotpassword';
import Adminprofile from './components/Adminprofile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/sidebar' element={<Sidebar />}></Route>
          <Route path='/inquiry' element={<Inquiry />}></Route>
          <Route path='/getintouch' element={<Getintouch />}></Route>
          <Route path='/joinourteam' element={<Joinourteam />}></Route>
          <Route path='/cpartner' element={<Cpartner />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/pdf' element={<Pdf />}></Route>
          <Route path='/forgotpassword' element={<Forgotpassword />}></Route>
          <Route path='/adminprofile' element={<Adminprofile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
