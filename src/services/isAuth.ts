
export const isAuth = (): boolean  => {
  return Boolean(localStorage.getItem('token'));
}