import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Aboutus from './Pages/Aboutus/Aboutus';
import Contactus from './Pages/Contactus/Contactus';
import Shop from './Pages/Shop/Shop';
import Signup from './Pages/Authentication/Signup';
import Login from './Pages/Authentication/Login';

function App() {
  return (
    <div >
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/aboutus' element={<Aboutus/>}/>
        <Route path='/contactus' element={<Contactus/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>      
    </div>
  );
}

export default App;
