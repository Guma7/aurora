import React from 'react';

const ActivityIndicator = ({ data }) => {
  if (!data) return null;
  
  // Separar dados por hemisfério
  const northernData = data.coordinates
    .filter(coord => coord[1] >= 0 && Math.abs(coord[1]) >= 55) // Hemisfério Norte
    .map(coord => coord[2]);
    
  const southernData = data.coordinates
    .filter(coord => coord[1] < 0 && Math.abs(coord[1]) >= 55) // Hemisfério Sul
    .map(coord => coord[2]);
  
  // Calcular médias para cada hemisfério
  const northAvgProbability = northernData.length > 0 
    ? northernData.reduce((sum, prob) => sum + prob, 0) / northernData.length 
    : 0;
    
  const southAvgProbability = southernData.length > 0 
    ? southernData.reduce((sum, prob) => sum + prob, 0) / southernData.length 
    : 0;
  
  // Determinar níveis de atividade para cada hemisfério
  const getActivityLevel = (probability) => {
    if (probability >= 60) return { level: 'Alta', color: 'green' };
    if (probability >= 30) return { level: 'Média', color: 'yellow' };
    return { level: 'Baixa', color: 'orange' };
  };
  
  const northActivity = getActivityLevel(northAvgProbability);
  const southActivity = getActivityLevel(southAvgProbability);
  
  return (
    <div style={{ margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Aurora Boreal (Hemisfério Norte) */}
      <div style={{ padding: '12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px', color: '#39ff14' }}>
          Aurora Boreal (Hemisfério Norte):
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span>Probabilidade média: </span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(northAvgProbability)}%</span>
          </div>
          <div>
            <span>Nível de atividade: </span>
            <span style={{ fontWeight: 'bold', color: northActivity.color }}>{northActivity.level}</span>
          </div>
        </div>
      </div>
      
      {/* Aurora Austral (Hemisfério Sul) */}
      <div style={{ padding: '12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px', color: '#39ff14' }}>
          Aurora Austral (Hemisfério Sul):
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span>Probabilidade média: </span>
            <span style={{ fontWeight: 'bold' }}>{Math.round(southAvgProbability)}%</span>
          </div>
          <div>
            <span>Nível de atividade: </span>
            <span style={{ fontWeight: 'bold', color: southActivity.color }}>{southActivity.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityIndicator;