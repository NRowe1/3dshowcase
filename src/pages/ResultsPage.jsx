import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function ResultsPage() {
  const [modelUrl, setModelUrl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (query) => {
    const response = await fetch(`https://api.sketchfab.com/v3/search?type=models&q=${query}&features=downloadable`, {
      headers: {
        Authorization: `Bearer YOUR_SKETCHFAB_API_TOKEN`,
      },
    });
    const data = await response.json();
    setSearchResults(data.results);
  };

  const handleModelSelect = async (uid) => {
    const response = await fetch(`https://api.sketchfab.com/v3/models/${uid}`, {
      headers: {
        Authorization: `Bearer YOUR_SKETCHFAB_API_TOKEN`,
      },
    });
    const modelData = await response.json();
    if (modelData.download) {
      const gltfUrl = modelData.download.gltf.url;
      setModelUrl(gltfUrl);
    } else {
      alert('This model is not available for download.');
    }
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1, backgroundColor: 'white', padding: '10px', borderRadius: '8px' }}>
        <SearchBar onSearch={(query) => navigate(`/results?query=${query}`)} />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {searchResults.map((result) => (
            <li key={result.uid} onClick={() => handleModelSelect(result.uid)} style={{ cursor: 'pointer', marginBottom: '5px' }}>
              {result.name}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ width: '600px', height: '400px', position: 'relative', margin: '0 auto' }}>
        <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ width: '100%', height: '100%' }}>
          <color attach="background" args={['#101010']} />
          <PresentationControls speed={1.5} global zoom={1.5} polar={[-0.1, Math.PI / 4]}>
            <Stage environment={null}>
              {modelUrl && <Model url={modelUrl} scale={0.01} />}
            </Stage>
          </PresentationControls>
        </Canvas>
      </div>
    </div>
  );
}

export default ResultsPage;  // Ensure the default export
