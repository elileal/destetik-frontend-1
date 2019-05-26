import api from './config';

const getAll = async () => {
  const response = await api.get('api/service');
  return response.data;
};

export default { getAll };
