export const fetchAuroraData = async () => {
  // Determinar a URL da API com base no ambiente
  const apiUrl = process.env.NODE_ENV === 'production'
    ? '/api/aurora-data' // URL relativa em produção
    : 'http://localhost:3001/api/aurora-data'; // URL de desenvolvimento local
    
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