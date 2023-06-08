import React, { useContext, useState, FC } from 'react'
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import axios from '../../../axios';
import { AuthContext, defaultValueUser } from '../../../provider/AuthProvider';
import { useTitle } from '../../../hooks/useTitle';
import { useForm } from 'react-hook-form';
import { TypeUser } from '../../../types/user.type';
import Layout from '../../layout/Layout';

const LoginScreen: FC = () => {
  useTitle("Авторизация");
  const { login } = useContext(AuthContext);
  const [errorText, setErrorText] = useState<string>('')
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValueUser
  });

  const submitForm = async (userValue: TypeUser) => {
    try {
      const { data } = await axios.post('ru/data/v3/testmethods/docs/login', userValue);
      if (data.data) {
        login(data.data)
      } else {
        setErrorText('Неправильный логин или пароль')
      }
    } catch (error) {
      setErrorText('Произошла ошибка при авторизации')
    }
  }
  return (
    <Layout>
      <Container component="div" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              {...register('username', {required: 'Это поле обязательное'})}
              margin="normal"
              required
              fullWidth
              label="Логин"
              type="text"
              id="username"
            />
            <p>{errors.username?.message}</p>
            <TextField
              {...register('password', {required: 'Это поле обязательное'})}
              margin="normal"
              required
              fullWidth
              label="Пароль"
              type="password"
              id="password"
            />
            <p>{errors.password?.message}</p>
            <p>{errorText}</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти в аккаунт
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default LoginScreen;