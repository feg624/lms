import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from './pages/Home';
import Login from './pages/Login';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/auth/userinfo`, {
          withCredentials: true
        });
        setUser(resp.data);
      }
      catch (err) {
        setUser(null);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigation user={user}/>}>
            <Route index           element={<Home/>}/>
            <Route path='login'    element={user ? <Navigate to='/'/> : <Login/>}               />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
