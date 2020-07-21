import axios from 'axios';

export const getJWT = () => localStorage.getItem(process.env.JWT);

export const axiosConfigs = () => {
  const jwt = getJWT();
  return axios.create({
    headers: {
      'Authorization': `Bearer ${jwt}`,
    },
  });
}
