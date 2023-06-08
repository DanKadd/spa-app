import React, { FC } from 'react'
import style from './Welcome.module.scss';
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useTitle } from '../../../hooks/useTitle';

const WelcomeScreen: FC = () => {
  useTitle("Приветствие");
  const navigate = useNavigate();
  return (
    <Layout>
      <div className={style.welcome}>
        <div className={style.welcome_box}>
          <Typography variant='h5' sx={{marginBottom: '15px'}}>Войдите в систему</Typography>
          <Button variant='contained' onClick={() => navigate('/login')}>Войти</Button>
        </div>
      </div>
    </Layout>
  )
}

export default WelcomeScreen;