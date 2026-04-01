'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface LocationPickerProps {
  onLocationSelect: (location: string, coordinates?: { lat: number; lng: number }) => void;
  apiKey: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function LocationPicker({ onLocationSelect, apiKey }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerInstanceRef = useRef<any>(null);
  const autocompleteRef = useRef<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  /** Initialize the map and autocomplete */
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 }, // India center
      zoom: 5,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    const markerInstance = new window.google.maps.Marker({
      map: mapInstance,
      draggable: true,
    });

    mapInstanceRef.current = mapInstance;
    markerInstanceRef.current = markerInstance;

    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('location-input') as HTMLInputElement,
      {
        types: ['(cities)'],
        componentRestrictions: { country: 'in' },
      }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        mapInstance.setCenter(location);
        mapInstance.setZoom(10);
        markerInstance.setPosition(location);

        const locationName = place.name || place.formatted_address || '';
        setSelectedLocation(locationName);
        onLocationSelect(locationName, {
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    });

    autocompleteRef.current = autocomplete;

    mapInstance.addListener('click', (event: any) => {
      const clickedLocation = event.latLng;
      markerInstance.setPosition(clickedLocation);

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: clickedLocation }, (results: any[], status: string) => {
        if (status === 'OK' && results[0]) {
          const locationName = results[0].formatted_address;
          setSelectedLocation(locationName);
          onLocationSelect(locationName, {
            lat: clickedLocation.lat(),
            lng: clickedLocation.lng(),
          });
        }
      });
    });
  }, [onLocationSelect]);

  /** Load Google Maps script dynamically */
  const loadGoogleMaps = useCallback(() => {
    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    script.id = 'google-maps-script';
    document.head.appendChild(script);
  }, [apiKey, initializeMap]);

  useEffect(() => {
    loadGoogleMaps();

    // Cleanup on unmount
    return () => {
      const script = document.getElementById('google-maps-script');
      if (script) {
        script.remove();
      }
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
      if (mapInstanceRef.current) {
        window.google.maps.event.clearInstanceListeners(mapInstanceRef.current);
      }
      if (markerInstanceRef.current) {
        window.google.maps.event.clearInstanceListeners(markerInstanceRef.current);
      }
    };
  }, [loadGoogleMaps]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Location</h3>

      <div className="mb-4">
        <input
          id="location-input"
          type="text"
          placeholder="Search for your city..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />
      </div>

      <div ref={mapRef} className="w-full h-64 rounded-lg border border-gray-200 mb-4"></div>

      {selectedLocation && (
        <div className="flex items-center p-3 bg-green-50 rounded-lg">
          <div className="w-5 h-5 flex items-center justify-center mr-3">
            <i className="ri-map-pin-line text-green-600"></i>
          </div>
          <span className="text-green-800 font-medium">{selectedLocation}</span>
        </div>
      )}
    </div>
  );
}
