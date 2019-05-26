import api from './config';

const getAll = async () => {
  const response = await api.get('api/user/all');
  return response.data;
};

export default { getAll };
