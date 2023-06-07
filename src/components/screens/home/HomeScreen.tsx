import React from 'react'
import { useTitle } from '../../../hooks/useTitle'
import Layout from '../../layout/Layout';
import DataTable from '../../ui/table/Table';
import { Typography } from '@mui/material';

const HomeScreen = () => {
  useTitle("Главная");
  
  return (
    <Layout>
      <Typography component='h2' variant='h5' sx={{marginBottom: '15px'}}>Табличные данные</Typography>
      <DataTable />
    </Layout>
  )
}

export default HomeScreen