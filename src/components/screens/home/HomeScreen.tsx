import React, { FC } from 'react'
import { useTitle } from '../../../hooks/useTitle'
import Layout from '../../layout/Layout';
import DataTable from '../../table/Table';
import { Typography } from '@mui/material';

const HomeScreen: FC = () => {
  useTitle("Главная");
  
  return (
    <Layout>
      <Typography variant='h5' sx={{marginBottom: '15px'}}>Табличные данные</Typography>
      <DataTable />
    </Layout>
  )
}

export default HomeScreen