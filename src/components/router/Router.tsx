import React, {useContext, useEffect} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider';
import { isAuth } from '../../services/isAuth';
import { privateRoutes, publicRoutes } from './routes';

const Router = () => {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    setUser(prev => ({...prev, user: isAuth()}))
  }, [user.user, setUser])
  
  return (
      user.user ? (
        <Routes>
          {privateRoutes.map(({component, path}, i) => <Route path={path} element={component} key={i} />)}
          <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
      ) : <Routes>  
        {publicRoutes.map(({component, path}, i) => <Route path={path} element={component} key={i} />)}
        <Route path='*' element={<Navigate to='/welcome'/>} />
      </Routes>
  )
}

export default Router