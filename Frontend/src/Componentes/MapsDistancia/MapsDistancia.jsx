import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript, InfoWindow } from '@react-google-maps/api';
import restauranteIcon from '../../utils/restaurante-icon-marker.png';

const libraries = ['places', 'geometry'];

function MapsDistancia({ userLocation, restauranteLocation,nombreRestaurante }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDYexKFc1yeHMP-5ZGWjvCNMVsrwbwpkgw',
    libraries: libraries
  });

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [distance, setDistance] = useState('');
  const [route, setRoute] = useState(null);
  const [markerOpen, setMarkerOpen] = useState(false);
  

  const getAddressFromLatLng = (latLng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
        setCity(getCityFromAddress(results[0].address_components));
        calculateDistanceAndRoute(userLocation, latLng);
      } else {
        console.error('Error al obtener la dirección');
      }
    });
  };

  const calculateDistanceAndRoute = async (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();

    const request = {
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
    };

    directionsService.route(request, (response, status) => {
      if (status === 'OK' && response.routes.length > 0) {
        const distancia = response.routes[0].legs[0].distance.text;
        const ruta = response.routes[0].overview_polyline;

        setDistance(distancia);
        setRoute(ruta);
      } else {
        console.error('Error al calcular la distancia');
      }
    });
  };

  const getCityFromAddress = (addressComponents) => {
    for (let i = 0; i < addressComponents.length; i++) {
      const component = addressComponents[i];
      if (component.types.includes('locality')) {
        return component.long_name;
      }
    }
    return '';
  };

  const handleMarkerClick = () => {
    setMarkerOpen(true);
  }

  const handleMarkerClose = () => {
    setMarkerOpen(false);
  }

  useEffect(() => {
    if (isLoaded && !loadError && userLocation && restauranteLocation) {
      getAddressFromLatLng(restauranteLocation);
    }
  }, [isLoaded, loadError, userLocation, restauranteLocation]);

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={restauranteLocation}
        zoom={13}
      >
        {restauranteLocation && (
          <Marker
            position={restauranteLocation}
            icon={{
              url: restauranteIcon,
              scaledSize: new window.google.maps.Size(60, 60),
            }}
            onClick={handleMarkerClick}
          >
            {markerOpen && (
              <InfoWindow 
              position ={restauranteLocation}
              onCloseClick={handleMarkerClose}>
                <div>
                  <h2>{nombreRestaurante}</h2>
                  <p>Ciudad: {city}</p>
                  <p>Direccion: {address}</p>
                  <p>Distancia: {distance}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )}
        {route && (
          <Polyline
            path={window.google.maps.geometry.encoding.decodePath(route)}
            options={{ strokeColor: '#0000FF' }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default MapsDistancia;