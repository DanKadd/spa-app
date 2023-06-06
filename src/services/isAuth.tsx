
export const isAuth = () => {
  return Boolean(localStorage.getItem('token'));
}