import api from './config';

const getPerformedServicesAsClient = async () => {
  const response = await api.get('/api/performed/showClient');
  return response.data;
};

const getPerformedServicesAsProvider = async () => {
  const response = await api.get('/api/performed/showProvider');
  return response.data;
};

const contractService = async contract => {
  const response = await api.post('/api/performed/create', contract);
  return response.data;
};

const rateService = async rate => {
  const response = await api.post('/api/rating/create', rate);
  return response.data;
};

export default {
  getPerformedServicesAsClient,
  getPerformedServicesAsProvider,
  contractService,
  rateService
};
