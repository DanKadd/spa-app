import React, {useContext} from 'react'
import { Button } from '@mui/material'
import style from './Header.module.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(prev => ({...prev, user: false}));
    navigate('/login');
  }
  
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.header_box}>
          <Button variant="contained" endIcon={<LogoutIcon />} onClick={handleLogout}>Выйти</Button>
        </div>  
      </div>
    </header>
  )
}

export default Header