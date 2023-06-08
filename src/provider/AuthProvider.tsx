import React, { createContext, useState, FC, PropsWithChildren, Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../services/isAuth';
import { TypeUser } from '../types/user.type';

type TypeTokenUser = {
  token: string
}

type TypeAuthContext = {
  user: TypeUser,
  setUser: Dispatch<SetStateAction<TypeUser>>,
  logout: () => void,
  login: (data: TypeTokenUser) => void
}

export const defaultValueUser: TypeUser = {
  username: '',
  password: '',
  user: isAuth()
}

export const AuthContext = createContext<TypeAuthContext>({
  user: defaultValueUser,
  setUser: () => {},
  logout: () => {},
  login: () => {}
});

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
  const [user, setUser] = useState<TypeUser>(defaultValueUser);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(prev => ({...prev, user: false}));
    navigate('/login');
  }

  const login = (data: TypeTokenUser) => {
    localStorage.setItem('token', data.token);
    setUser({...user, user: true});
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{user, setUser, logout, login}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;