import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

function MapsDistancia({ userLocation, restauranteLocation }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDYexKFc1yeHMP-5ZGWjvCNMVsrwbwpkgw',
    libraries: libraries
  });

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [distance, setDistance] = useState('');
  const [route, setRoute] = useState(null);

  const getAddressFromLatLng = (latLng) => {
    const geocoder = new google.maps.Geocoder();
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
    const directionsService = new google.maps.DirectionsService();

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
      {/* {city && <p>Ciudad: {city}</p>} */}
      {/* {distance && <p>Distancia: {distance}</p>} */}
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={restauranteLocation}
        zoom={7}
      >
        {restauranteLocation && <Marker position={restauranteLocation} />}
        {route && <Polyline path={route} options={{ strokeColor: '#0000FF' }} />}
      </GoogleMap>
    </div>
  );
}

export default MapsDistancia;