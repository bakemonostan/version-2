"use client";
import React, { useEffect, useState } from "react";
import { useVehicleListingStore } from "../vehicleListingstore";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { fetchAddressFromPostalCode } from "../utils/addressUtils";

export default function MapComponent() {
  const { address, postal_code, setAddress } = useVehicleListingStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCoordinates = async () => {
      if (postal_code && (!address.coordinates || !address.coordinates.lat)) {
        setIsLoading(true);
        try {
          const addressData = await fetchAddressFromPostalCode(postal_code);
          if (addressData) {
            setAddress(addressData);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getCoordinates();
  }, [postal_code, address.coordinates, setAddress]);

  const containerStyle = {
    width: "100%",
    height: "241px",
  };

  // Ensure coordinates are never undefined
  const center = {
    lat: address.coordinates?.lat ?? 0,
    lng: address.coordinates?.lng ?? 0,
  };

  function MyComponent() {
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    });

    const [map, setMap] = React.useState<google.maps.Map | null>(null);

    const onLoad = React.useCallback((mapInstance: google.maps.Map) => {
      // Simply set the map and let the center property handle positioning
      setMap(mapInstance);
    }, []);

    const onUnmount = React.useCallback(() => {
      if (map) {
        setMap(null);
      }
    }, [map]);

    if (isLoading) {
      return <div className="h-[241px] w-full flex items-center justify-center bg-gray-100">Loading address data...</div>;
    }

    if (!postal_code) {
      return <div className="h-[241px] w-full flex items-center justify-center bg-gray-100">Please enter a postal code to view the map</div>;
    }

    if (!isLoaded) {
      return <div className="h-[241px] w-full flex items-center justify-center bg-gray-100">Loading map...</div>;
    }

    if (!address.coordinates?.lat || !address.coordinates?.lng) {
      return <div className="h-[241px] w-full flex items-center justify-center bg-gray-100">No location found for this postal code</div>;
    }

    return (
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15} // Increased zoom level to focus more on the specific location
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {address.coordinates && (
            <Marker
              position={{
                lat: address.coordinates.lat,
                lng: address.coordinates.lng,
              }}
            />
          )}
        </GoogleMap>
      </>
    );
  }

  return <MyComponent />;
}
