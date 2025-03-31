/**
 * Google Maps API utility functions
 */

import { toast } from "sonner";

type GeocodeResult = {
  isValid: boolean;
  formattedAddress?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  error?: string;
};

/**
 * Load Google Maps API script
 * @param apiKey - Google Maps API key
 * @param callback - Optional callback function to execute when API is loaded
 * @returns Promise that resolves when the API is loaded
 */
export const loadGoogleMapsAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      console.log("Google Maps API already loaded");
      resolve();
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com/maps/api"]'
    );
    if (existingScript) {
      console.log("Google Maps API script already loading");
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Maps API loaded successfully");
      resolve();
    };

    script.onerror = (e) => {
      reject(e);
    };

    document.head.appendChild(script);
  });
};

/**
 * Validate a postal code using Google Maps Geocoding API
 * @param postalCode - Postal code to validate
 * @returns Promise with geocode result
 */
export const validatePostalCode = async (
  postalCode: string
): Promise<GeocodeResult> => {
  if (!postalCode) {
    return {
      isValid: false,
      error: "Postal code is required",
    };
  }

  try {
    // Ensure Google Maps API is loaded
    if (
      typeof window === "undefined" ||
      !window.google ||
      !window.google.maps
    ) {
      try {
        await loadGoogleMapsAPI();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unknown error loading Google Maps API"
        );
        return {
          isValid: false,
          error: "Google Maps API failed to load",
        };
      }
    }

    // Use geocoding service to validate the postal code
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({ address: postalCode });

    if (result.results && result.results.length > 0) {
      const location = result.results[0].geometry.location;
      const formattedAddress = result.results[0].formatted_address;

      return {
        isValid: true,
        formattedAddress,
        coordinates: {
          lat: location.lat(),
          lng: location.lng(),
        },
      };
    } else {
      return {
        isValid: false,
        error: "Invalid postal code. No location found.",
      };
    }
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Unknown error validating postal code"
    );
    return {
      isValid: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error validating postal code",
    };
  }
};
