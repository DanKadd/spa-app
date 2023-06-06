import React, {FC, PropsWithChildren} from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../ui/header/Header'

const Layout:FC<PropsWithChildren<unknown>> = ({children}) => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/welcome' && pathname !== '/login'  && <Header/> }
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
    </>
  )
}

export default Layout