import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/Users';
import Schools from './pages/Schools';
import SchoolUsers from './pages/SchoolUsers';
import SchoolCourses from './pages/SchoolCourses';
import TeacherCourses from './pages/TeacherCourses';
import StudentCourses from './pages/StudentCourses';
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
            <Route index                              element={<Home/>}/>
            <Route path='login'                       element={                                         (user) ? <Navigate to='/'/> : <Login/>}/>
            <Route path='users'                       element={user?.superAdmin  ? <Users/>          : ((user) ? <Navigate to='/'/> : <Navigate to='/login'/>)}/>
            <Route path='schools'                     element={user?.superAdmin  ? <Schools/>        : ((user) ? <Navigate to='/'/> : <Navigate to='/login'/>)}/>
            <Route path='schools/:schoolId/users'     element={user?.schoolAdmin ? <SchoolUsers/>    : ((user) ? <Navigate to='/'/> : <Navigate to='/login'/>)}/>
            <Route path='schools/:schoolId/courses'   element={user?.schoolAdmin ? <SchoolCourses/>  : ((user) ? <Navigate to='/'/> : <Navigate to='/login'/>)}/>
            <Route path='teachers/:teacherId/courses' element={user?.teacher     ? <TeacherCourses/> : ((user) ? <Navigate to='/'/> : <Navigate to='/login'/>)}/>
            <Route path='students/:studentId/courses' element={user?.student     ? <StudentCourses/> : ((user) ? <Navigate to='/'/> : <Navigate to='/login'/>)}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
