import React from 'react'
import { useTitle } from '../../../hooks/useTitle';
import Layout from '../../layout/Layout';
import { Typography, Button } from '@mui/material'
import style from './NotFound.module.scss'
import { useNavigate } from 'react-router-dom';

const NotFoundScreen = () => {
  useTitle("Страница не найдена");
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={style.notfound}>
        <div className={style.notfound_box}>
          <Typography variant='h4'>404 Страница не найдена</Typography>
          <Button variant='contained' onClick={() => navigate('/')} sx={{marginTop: '15px'}}>На главную</Button>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundScreen;