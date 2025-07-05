import React, { useState, useEffect } from 'react';
import AuroraMap from './components/AuroraMap';
import AuroraLiveCams from './components/AuroraLiveCams';
import ActivityIndicator from './components/ActivityIndicator';
import './App.css';

function App() {
  const [auroraData, setAuroraData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCams, setShowCams] = useState(false);
  
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      // URL da API em produção
      const apiUrl = 'https://auroraapi-11yt.onrender.com/api/aurora-data';
      
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Falha ao carregar dados da API');
          }
          return response.json();
        })
        .then(data => {
          if (!data || !data.coordinates || !Array.isArray(data.coordinates)) {
            throw new Error('Formato de dados inválido');
          }
          setAuroraData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Erro ao buscar dados:', err);
          setError(err.message);
          setLoading(false);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 600000); // 10 minutos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <h1>Aurora</h1>
      <div style={{ margin: '24px 0', textAlign: 'center' }}>
        <button
          onClick={() => setShowCams((prev) => !prev)}
          style={{
            background: '#39ff14',
            color: '#222',
            border: 'none',
            borderRadius: 8,
            padding: '10px 22px',
            fontSize: 16,
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            marginBottom: 10
          }}
        >
          {showCams ? 'Ocultar Câmeras ao Vivo' : 'Ver Câmeras ao Vivo'}
        </button>
      </div>
      {showCams && <AuroraLiveCams />}
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#fff' }}>
          Carregando dados da previsão...
        </div>
      )}
      {error && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#ff6b6b', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: '8px' }}>
          Erro: {error}
        </div>
      )}
      {!loading && !error && auroraData && (
        <>
          <div style={{ marginBottom: '16px', fontSize: '15px', lineHeight: '1.5' }}>
            Estes mapas mostram a probabilidade de visualização das auroras (Boreal e Austral) com base nos dados mais recentes da NOAA. 
            As áreas coloridas indicam diferentes níveis de probabilidade conforme as legendas abaixo.
          </div>
          <ActivityIndicator data={auroraData} />
          <AuroraMap data={auroraData} />
        </>
      )}
    </div>
  );
}

export default App;