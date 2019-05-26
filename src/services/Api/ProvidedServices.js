import api from './config';

const getAvailable = async () => {
  const response = await api.get('/api/provided/available');
  return response.data;
};

const show = async () => {
  const response = await api.get('/api/provided/show');
  return response.data;
};

const add = async newService => {
  const response = await api.post('/api/provided/create', newService);
  return response.data;
};

const update = async (serviceId, newPrice) => {
  const response = await api.patch(`/api/provided/update/${serviceId}`, {
    price: newPrice
  });
  return response;
};

const remove = async serviceId => {
  const response = await api.delete(`/api/provided/delete/${serviceId}`);
  return response;
};

export default { getAvailable, show, add, update, remove };
