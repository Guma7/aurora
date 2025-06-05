import React, { useMemo } from 'react';

// Componente para exibir câmeras ao vivo das Auroras (Boreal e Austral)
const AuroraLiveCams = () => {
  // Câmeras da Aurora Boreal (hemisfério norte)
  const borealCams = useMemo(() => [
    {
      name: 'Abisko, Suécia - Aurora (High Q) Webcam',
      url: `https://player.twitch.tv/?channel=lightsoverlaplandlive&parent=${window.location.hostname}&muted=true`,
      site: 'Lights Over Lapland',
      description: 'Câmera ao vivo de Abisko, Suécia, fornecida por Lights Over Lapland.'
    },
    {
      name: 'Abisko, Suécia - Aurora (2) Webcam',
      url: `https://player.twitch.tv/?channel=lightsoverlapland&parent=${window.location.hostname}&muted=true`,
      site: 'Lights Over Lapland',
      description: 'Câmera ao vivo de Abisko, Suécia, fornecida por Lights Over Lapland.'
    },
    {
      name: 'Fairbanks, Alaska',
      url: 'https://www.youtube.com/embed/O52zDyxg5QI',
      site: 'Explore.org',
      description: 'Câmera ao vivo de Fairbanks, Alaska, fornecida por Explore.org.'
    },
    {
      name: 'Churchill, Manitoba, Canada',
      url: 'https://www.youtube.com/embed/a0i1Kg6fROg',
      site: 'Explore.org',
      description: 'Câmera de Churchill, Manitoba, Canada, fornecida por Explore.org.'
    },
  ], []);

  // Câmeras da Aurora Austral (hemisfério sul)
  const australCams = useMemo(() => [
    {
      name: 'Ushuaia, Argentina - Aurora Austral',
      url: 'https://www.youtube.com/embed/LTXzMmprBn0',
      site: 'SkylineWebcams',
      description: 'Câmera ao vivo de Ushuaia, Argentina, ponto de observação da Aurora Austral.'
    },
    {
      name: 'Nelson/Tasman, Nova Zelândia',
      url: 'https://www.youtube.com/embed/CQDK1jm6fTQ',
      site: 'WISP Tasman',
      description: 'Câmera ao vivo de Nelson/Tasman, Nova Zelândia.'
    },
    {
      name: 'Cairns Beach, Austrália (12/05/2024)',
      url: 'https://www.youtube.com/embed/MRwlmMqBNFw',
      site: 'Antarctica NZ',
      description: 'Registro de Aurora Austral em Cairns Beach, Austrália.'
    },
  ], []);

  return (
  <div style={{ background: 'rgba(34,34,34,0.95)', color: '#fff', padding: 24, borderRadius: 16, margin: '24px auto', maxWidth: 900, boxShadow: '0 2px 16px rgba(0,0,0,0.25)' }}>
    <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Câmeras ao Vivo - Aurora Boreal (Hemisfério Norte)</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
      {borealCams.map((cam, idx) => (
        <div key={idx} style={{ background: '#222', borderRadius: 12, padding: 16, width: 320, boxSizing: 'border-box', boxShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 10 }}>
            <iframe
              src={cam.url}
              title={cam.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, borderRadius: 8, background: '#111' }}
            ></iframe>
          </div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>{cam.name}</div>
          <div style={{ fontSize: 13, margin: '6px 0 8px 0', opacity: 0.85 }}>{cam.description}</div>
          <span style={{ color: '#39ff14', fontSize: 14 }}>{cam.site}</span>
        </div>
      ))}
    </div>
    
    <h2 style={{ textAlign: 'center', margin: '36px 0 18px 0' }}>Câmeras ao Vivo - Aurora Austral (Hemisfério Sul)</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
      {australCams.map((cam, idx) => (
        <div key={idx} style={{ background: '#222', borderRadius: 12, padding: 16, width: 320, boxSizing: 'border-box', boxShadow: '0 1px 8px rgba(0,0,0,0.18)' }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 10 }}>
            <iframe
              src={cam.url}
              title={cam.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, borderRadius: 8, background: '#111' }}
            ></iframe>
          </div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>{cam.name}</div>
          <div style={{ fontSize: 13, margin: '6px 0 8px 0', opacity: 0.85 }}>{cam.description}</div>
          <span style={{ color: '#39ff14', fontSize: 14 }}>{cam.site}</span>
        </div>
      ))}
    </div>
    
    <div style={{ marginTop: 22, fontSize: 13, textAlign: 'center', opacity: 0.8 }}>
      As transmissões ao vivo são fornecidas por projetos oficiais e podem estar sujeitas à disponibilidade.
    </div>
  </div>
  );
};

export default AuroraLiveCams;