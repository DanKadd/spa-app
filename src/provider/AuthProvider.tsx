import React, { createContext, useState, FC, PropsWithChildren, Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../services/isAuth';
import { TypeUser } from '../types/user.type';

type TypeContext = {
  user: TypeUser,
  setUser: Dispatch<SetStateAction<TypeUser>>,
  logout: () => void,
  login: (data: TypeTokenUser) => void
}

type TypeTokenUser = {
  token: string
}

export const defaultValueUser: TypeUser = {
  username: '',
  password: '',
  user: isAuth()
}

export const AuthContext = createContext<TypeContext>({
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
    setUser({...user, user: true});
    localStorage.setItem('token', data.token);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{user, setUser, logout, login}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;