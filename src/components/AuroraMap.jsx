import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const getColor = (prob) => {
  if (prob === 0) return 'transparent';
  // 10 cores para intervalos de 10%
  const palette = [
    '#001f4d', // 1-9% azul marinho
    '#6c3483', // 10-19% roxo médio escuro
    '#ffe066', // 20-29% amarelo médio
    '#ff9900', // 30-39% laranja médio
    '#a0522d', // 40-49% marrom médio
    '#e53935', // 50-59% vermelho médio
    '#8b0000', // 60-69% vermelho bordô
    '#1abc9c', // 70-79% turquesa
    '#43a047', // 80-89% verde médio
    '#39ff14'  // 90-100% verde neon
  ];
  // Garantir que o índice seja calculado corretamente
  const idx = Math.min(9, Math.max(0, Math.floor(prob / 10)));
  return palette[idx];
};

const getLegend = (isNorthern = true) => (
  <div style={{
    background: 'rgba(34,34,34,0.95)', color: '#fff', padding: '14px 18px', borderRadius: '12px', marginTop: 18, fontSize: 15, maxWidth: 350, boxShadow: '0 2px 12px rgba(0,0,0,0.25)', position: 'relative', left: '50%', transform: 'translateX(-50%)', border: '1.5px solid #444'
  }}>
    <b style={{fontSize:16}}>Legenda - Probabilidade de Aurora {isNorthern ? 'Boreal' : 'Austral'}</b>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: '#001f4d', display: 'inline-block', borderRadius: 8, marginRight: 8, border: '1.5px solid #fff' }}></span>
        <span>1% - 9%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: '#6c3483', display: 'inline-block', borderRadius: 8, marginRight: 8, border: '1.5px solid #fff' }}></span>
        <span>10% - 19%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: '#ffe066', display: 'inline-block', borderRadius: 8, marginRight: 8, border: '1.5px solid #fff' }}></span>
        <span>20% - 29%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: '#ff9900', display: 'inline-block', borderRadius: 8, marginRight: 8, border: '1.5px solid #fff' }}></span>
        <span>30% - 39%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: '#a0522d', display: 'inline-block', borderRadius: 8, marginRight: 8, border: '1.5px solid #fff' }}></span>
        <span>40% - 49%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: '#e53935', display: 'inline-block', borderRadius: 8, marginRight: 8, border: '1.5px solid #fff' }}></span>
        <span>50% - 59%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: '#8b0000', display: 'inline-block', borderRadius: 8, marginRight: 8, border: '1.5px solid #fff' }}></span>
        <span>60% - 69%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: '#1abc9c', display: 'inline-block', borderRadius: 8, marginRight: 8, border: '1.5px solid #fff' }}></span>
        <span>70% - 79%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: '#43a047', display: 'inline-block', borderRadius: 8, marginRight: 8, border: '1.5px solid #fff' }}></span>
        <span>80% - 89%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: '#39ff14', display: 'inline-block', borderRadius: 8, marginRight: 8, border: '1.5px solid #fff' }}></span>
        <span>90% - 100%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 26, height: 16, background: 'transparent', border: '1.5px solid #888', display: 'inline-block', borderRadius: 8, marginRight: 8 }}></span>
        <span>Sem possibilidade</span>
      </div>
    </div>
  </div>
);

const AuroraMap = ({ data }) => {
  // O horário previsto está em data['Forecast Time']
  const forecastTime = data['Forecast Time'] ? new Date(data['Forecast Time']).toLocaleString('pt-BR', { timeZone: 'UTC' }) : null;
  
  // Processar coordenadas para garantir precisão na exibição
  // Normalizar longitudes para o intervalo -180 a 180
  const processedCoordinates = data.coordinates.map(coord => {
    // Extrair as coordenadas originais
    const [longitude, latitude, probability] = coord;
    
    // Normalizar longitude para o intervalo -180 a 180
    let normalizedLongitude = longitude;
    while (normalizedLongitude > 180) normalizedLongitude -= 360;
    while (normalizedLongitude < -180) normalizedLongitude += 360;
    
    return [normalizedLongitude, latitude, probability];
  });
  
  // Separar dados por hemisfério
  const northernCoordinates = processedCoordinates.filter(coord => coord[1] >= 0);
  const southernCoordinates = processedCoordinates.filter(coord => coord[1] < 0);
  
  // Função para processar coordenadas por hemisfério
  const processHemisphereData = (coordinates) => {
    // Agrupar pontos próximos para evitar sobrecarga visual e melhorar performance
    const gridSize = 1; // Tamanho da grade em graus (1 grau é aproximadamente 111km no equador)
    const gridMap = new Map();
    
    // Processar coordenadas conforme o formato da API NOAA (longitude, latitude, probabilidade)
    coordinates.forEach(coord => {
      const [lng, lat, prob] = coord;
      
      // Pular pontos com probabilidade zero
      if (prob <= 0) return;
      
      // Arredondar para a grade mais próxima para agrupar pontos
      const gridLat = Math.round(lat / gridSize) * gridSize;
      const gridLng = Math.round(lng / gridSize) * gridSize;
      const key = `${gridLat},${gridLng}`;
      
      if (!gridMap.has(key) || gridMap.get(key)[2] < prob) {
        // Manter o ponto com maior probabilidade em cada célula da grade
        gridMap.set(key, [gridLng, gridLat, prob]);
      }
    });
    
    return Array.from(gridMap.values());
  };
  
  // Processar dados para cada hemisfério
  const optimizedNorthernCoordinates = processHemisphereData(northernCoordinates);
  const optimizedSouthernCoordinates = processHemisphereData(southernCoordinates);
  
  // Função para renderizar o mapa para um hemisfério específico
  const renderMap = (isNorthern) => {
    const coordinates = isNorthern ? optimizedNorthernCoordinates : optimizedSouthernCoordinates;
    const centerLat = isNorthern ? 60 : -60; // Centro do mapa para cada hemisfério
    const title = isNorthern ? 'Aurora Boreal (Hemisfério Norte)' : 'Aurora Austral (Hemisfério Sul)';
    
    return (
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ textAlign: 'center', marginBottom: 12, color: '#39ff14' }}>{title}</h3>
        <MapContainer 
          center={[centerLat, 0]} 
          zoom={1} 
          style={{ height: '400px', width: '100%' }}
          maxBounds={[[-90, -180], [90, 180]]}
          minZoom={1}
          maxZoom={10}
          worldCopyJump={true}
          attributionControl={false}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            noWrap={true}
            bounds={[[-90, -180], [90, 180]]}
            attribution='&copy; <a href="https://www.esri.com/">Esri</a> | Dados: NOAA SWPC'
          />
          {coordinates
            .filter(coord => {
              // Para o hemisfério norte (Aurora Boreal)
              if (isNorthern) {
                // Aceita coordenadas acima de 47° sem restrição de probabilidade
                if (coord[1] >= 52) return true;
                // Entre o equador e 52°, só aceita se a probabilidade for maior que 70%
                if (coord[1] >= 0 && coord[1] < 52) return coord[2] > 70;
                return false;
              } 
              // Para o hemisfério sul (Aurora Austral)
              else {
                // Definir a longitude de referência para o limite oeste (7.0°E, à esquerda do fim da África)
                const westLimitLongitude = 7.0;
                
                // Região oeste (incluindo América do Sul)
                if (coord[0] <= westLimitLongitude) {
                  // Aceita coordenadas abaixo de -57° sem restrição de probabilidade
                  if (coord[1] <= -59) return true;
                  // Entre o equador e -57°, só aceita se a probabilidade for maior que 50%
                  if (coord[1] < 0 && coord[1] > -59) return coord[2] > 50;
                }
                // Região leste (incluindo Austrália e Nova Zelândia)
                else {
                  // Aceita coordenadas abaixo de -40° sem restrição de probabilidade
                  // Ampliado para incluir a Austrália (latitude aproximada entre -10° e -40°)
                  if (coord[1] <= -40) return true;
                  // Entre o equador e -40°, só aceita se a probabilidade for maior que 50%
                  if (coord[1] < 0 && coord[1] > -40) return coord[2] > 50;
                }
                return false;
              }
            })
            .map((coord, index) => {
              const prob = coord[2];
              const color = getColor(prob);
              if (color === 'transparent') return null;
              // Ajustar o tamanho do marcador com base na probabilidade
              // Quanto maior a probabilidade, maior o marcador
              const radius = 2 + (prob / 15); // Raio entre 2 e 8.7 dependendo da probabilidade
              return (
                <CircleMarker
                  key={index}
                  center={[coord[1], coord[0]]}
                  radius={radius}
                  color={color}
                  fillColor={color}
                  fillOpacity={0.8}
                  weight={1}
                  stroke={true}
                  // Adicionar tooltip para mostrar informações ao passar o mouse
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.openPopup();
                    },
                    mouseout: (e) => {
                      e.target.closePopup();
                    }
                  }}
                >
                  <Popup>
                    <div style={{ textAlign: 'center', padding: '5px' }}>
                      <strong>Probabilidade:</strong> {Math.round(prob)}%<br/>
                      <strong>Coordenadas:</strong> {coord[1].toFixed(1)}°, {coord[0].toFixed(1)}°
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
        </MapContainer>
        {getLegend(isNorthern)}
      </div>
    );
  };
  
  return (
    <div className="map-container">
      {renderMap(true)} {/* Mapa para Aurora Boreal */}
      {renderMap(false)} {/* Mapa para Aurora Austral */}
      
      {forecastTime && (
        <div style={{ marginTop: 12, padding: '8px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', color: '#fff', fontSize: 15, textAlign: 'center' }}>
          <b>Horário da previsão (UTC):</b> {forecastTime}
          <div style={{ fontSize: 13, marginTop: 5, opacity: 0.9 }}>
            Dados fornecidos pela NOAA Space Weather Prediction Center
          </div>
        </div>
      )}
    </div>
  );
};

export default AuroraMap;