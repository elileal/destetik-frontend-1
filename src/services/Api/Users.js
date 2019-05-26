import api from './config';

const getAll = async () => {
  const response = await api.get('api/user/all');
  return response.data;
};

const show = async userId => {
  const response = await api.get(`/api/user/show/${userId}`);
  return response.data;
};

const register = async userData =>
  await api.post('api/user/register', userData);

const login = async userData => await api.post('api/user/login', userData);

const current = async () => {
  const response = await api.get('/api/user/current');
  return response.data;
};

const update = async userNewData => {
  const response = await api.patch('/api/user/update', userNewData);
  return response;
};

const updateImage = async (formData, config) => {
  await api.patch('/api/user/image_update', formData, config);
};

const deleteAccount = async () => {
  await api.delete('/api/user/delete');
};

export default {
  getAll,
  show,
  register,
  login,
  current,
  update,
  updateImage,
  deleteAccount
};
