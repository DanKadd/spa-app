import React, { useEffect, useState } from 'react'
import { useTitle } from '../../../hooks/useTitle'
import Layout from '../../layout/Layout';
import axios from '../../../axios';
import { TypeTable } from '../../../types/table.type'
import DataTable from '../../ui/table/Table';
import { Typography } from '@mui/material';

const HomeScreen = () => {
  useTitle("Главная");
  const [items, setItems] = useState<TypeTable[]>([]);

  useEffect(() => {
    const getItems = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_URI}ru/data/v3/testmethods/docs/userdocs/get`);
      setItems(data.data)
    }
    getItems();
  }, [])
  return (
    <Layout>
      <Typography component='h2' variant='h5' sx={{marginBottom: '15px'}}>Табличные данные</Typography>
      <DataTable data={items}/>
    </Layout>
  )
}

export default HomeScreen