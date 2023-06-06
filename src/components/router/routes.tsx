import HomeScreen from '../screens/home/HomeScreen'
import LoginScreen from '../screens/login/LoginScreen'
import NotFoundScreen from '../screens/not-found/NotFoundScreen';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';

type TypeComponent = {
  path: string,
  component: JSX.Element
}

export const publicRoutes: TypeComponent[] = [
  {
    path: '/login',
    component: <LoginScreen />
  },
  {
    path: '/welcome',
    component: <WelcomeScreen />
  },
  
]

export const privateRoutes: TypeComponent[] = [
  {
    path: '/',
    component: <HomeScreen />
  },
  {
    path: '*',
    component: <NotFoundScreen />
  },
]