import React, {useContext} from 'react'
import { Button } from '@mui/material'
import style from './Header.module.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../../provider/AuthProvider';

const Header = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.header_box}>
          <Button variant="contained" onClick={logout}><LogoutIcon /></Button>
        </div>  
      </div>
    </header>
  )
}

export default Header