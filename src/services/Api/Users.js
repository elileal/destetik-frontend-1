import api from './config';

const getAll = async () => {
  const response = await api.get('api/user/all');
  return response.data;
};

const register = async userData =>
  await api.post('api/user/register', userData);

const login = async userData => await api.post('api/user/login', userData);

export default { getAll, register, login };
