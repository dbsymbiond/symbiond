import React, { useRef } from 'react'; // Import useRef
import { Map } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibreGl from 'maplibre-gl';

const style = {
  version: 8,
  sources: {
    'symbiond': {
      type: 'vector',
      tiles: ['http://localhost:3000/api/tiles/{z}/{x}/{y}.pbf'],
      tileSize: 512,
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#466eab',
      },
    },
    {
      id: 'symbiond-fill',
      type: 'fill',
      source: 'symbiond',
      'source-layer': 'base_map_cells',
      paint: {
        'fill-color': [
          'case',
          ['==', ['get', 'biome'], 0], '#466eab',
          ['==', ['get', 'state'], 1], '#66c2a5',
          ['==', ['get', 'state'], 2], '#fc8d62',
          ['==', ['get', 'state'], 3], '#8da0cb',
          ['==', ['get', 'state'], 4], '#e78ac3',
          ['==', ['get', 'state'], 5], '#a6d854',
          ['==', ['get', 'state'], 6], '#ffd92f',
          ['==', ['get', 'state'], 7], '#7ae3a6',
          ['==', ['get', 'state'], 8], '#ffb36c',
          ['==', ['get', 'state'], 9], '#e0b2c5',
          ['==', ['get', 'state'], 10], '#e2b2c4',
          ['==', ['get', 'state'], 11], '#f8f83f',
          ['==', ['get', 'state'], 12], '#ffd83d',
          ['==', ['get', 'state'], 13], '#ffb46b',
          ['==', ['get', 'state'], 14], '#b8ce73',
          ['==', ['get', 'state'], 15], '#86c2d6',
          ['==', ['get', 'state'], 16], '#ff8dc8',
          ['==', ['get', 'state'], 17], '#c6e955',
          ['==', ['get', 'state'], 18], '#fdf83e',
          ['==', ['get', 'state'], 19], '#a5c4c8',
          ['==', ['get', 'state'], 20], '#fe8b7f',
          '#8B4513'
        ],
      },
    },
  ],
};

const MapComponent = () => {
  const mapRef = useRef(null);

  const onClick = (e) => {
    if (!mapRef.current) return;

    const features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ['symbiond-fill'],
    });

    console.log('Map click event:', e);
    console.log('Clicked Features:', features);

    if (features.length > 0) {
      console.log('Clicked Feature Properties:', features[0].properties);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Map
        initialViewState={{
          longitude: 0,
          latitude: -3,
          zoom: 4,
        }}
        mapStyle={style}
        mapLib={maplibreGl}
        onClick={onClick}
        ref={mapRef}
      />
    </div>
  );
};

export default MapComponent;