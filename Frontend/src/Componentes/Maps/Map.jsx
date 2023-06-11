import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import './mapa.css'

const libraries = ['places'];

function Map({ onMarkerPositionChange }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDYexKFc1yeHMP-5ZGWjvCNMVsrwbwpkgw',
    libraries: libraries
  });

  

  const [markerPosition, setMarkerPosition] = useState({ lat: 9.0, lng: -74.0 });
  const [address, setAddress] = useState('');

  useEffect(() => {
    onMarkerPositionChange(markerPosition);
  }, [markerPosition, onMarkerPositionChange]);

  const handleMapClick = (e) => {
    setMarkerPosition(e.latLng);
    getAddressFromLatLng(e.latLng);
  };

  const handleSelect = async (address) => {
    setAddress(address);
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setMarkerPosition(latLng);
    } catch (error) {
      console.error('Error al buscar la dirección', error);
    }
  };

  const getAddressFromLatLng = async (latLng) => {
    try {
      const results = await geocodeByAddress(`${latLng.lat()}, ${latLng.lng()}`);
      setAddress(results[0].formatted_address);
    } catch (error) {
      console.error('Error al obtener la dirección', error);
    }
  };

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div className='componente-mapa'>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({ placeholder: 'Buscar dirección' })} />
            <div>
              {loading && <div>Cargando...</div>}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? '#e6f2ff' : '#fff',
                  cursor: 'pointer'
                };
                return (
                  <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={markerPosition}
        zoom={7}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
      {address && (
        <div className='info-direccion'>
          <h2>Dirección seleccionada:</h2>
          <p>{address}</p>
        </div>
      )}
    </div>
  );
}

export default Map;