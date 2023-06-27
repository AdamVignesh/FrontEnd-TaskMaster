import axios from "axios";

export const isLoggedIn = () => {
  const accessToken = localStorage.getItem('accessToken');
  if(accessToken==null)
  {
    return false;
  }
  return true;
}


// export const getUserDetails=()=>{

//   var baseURL = process.env.REACT_APP_BASE_URL;
//   var access_token = localStorage.getItem('accessToken');
//   axios.get(baseURL+'/getUserDetails', {
//     params: {
//       accessToken: access_token
//     }
//   })
//   .then(response => response.json())
//   .then(  data=>{
//     console.log(data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// }

export const getUserDetails = async () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const access_token = localStorage.getItem('accessToken');
  
  if(access_token!=null){
  try {
    const response = await axios.get(`${baseURL}/getUserDetails`, {
      params: {
        accessToken: access_token
      }
    });
  
    const data = response.data;
    return data.userDetails;
  } catch (error) {
    console.log(error);
    return null;
  }
  }
};