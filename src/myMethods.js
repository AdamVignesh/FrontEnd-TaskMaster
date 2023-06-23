export const isLoggedIn = () => {
  const accessToken = localStorage.getItem('accessToken');
  if(accessToken==null)
  {
    return false;
  }
  return true;
}

