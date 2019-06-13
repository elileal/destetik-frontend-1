const getAddressFromViaCEP = async cep => {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const response = await fetch(url);
  return await response.json();
};

export default getAddressFromViaCEP;
