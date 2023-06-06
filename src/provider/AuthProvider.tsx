import React, { createContext, useState, FC, PropsWithChildren, Dispatch, SetStateAction } from 'react'
import { isAuth } from '../services/isAuth';
import { TypeUser } from '../types/user.type';

type TypeContext = {
  user: TypeUser,
  setUser: Dispatch<SetStateAction<TypeUser>>
}

export const defaultValueUser: TypeUser = {
  username: '',
  password: '',
  user: isAuth()
}

export const AuthContext = createContext<TypeContext>({
  user: defaultValueUser,
  setUser: () => {}
});

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
  const [user, setUser] = useState<TypeUser>(defaultValueUser);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;