export const fetchAuroraData = async () => {
  // URL da API em produção
  const apiUrl = 'https://auroraapi-11yt.onrender.com/api/aurora-data';
    
  const response = await fetch(apiUrl);
  return await response.json();
};

export const processAuroraData = (data) => {
  // Processa os dados para o componente
  return {
    coordinates: data.coordinates,
    activityLevel: calculateActivityLevel(data)
  };
};

function calculateActivityLevel(data) {
  // Lógica para determinar o nível de atividade
  return data.coordinates.length > 100 ? 'alta' : 'baixa';
}