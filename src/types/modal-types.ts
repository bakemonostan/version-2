// Basic modals
export type AppModalIds =
  | "listings"
  | "edit-bio"
  | "edit-details"
  | "address-modal"
  | "vehicle-type-modal"
  | "unavailability-modal"
  | "preview-submission-modal"
  | "hero-search-modal"
  | "vehicles-filter-modal";

export type ModalId = AppModalIds;

// Type for modals that don't need specific params
type DefaultParams = Record<string, never>;

// Specific parameter types for modals that need them
export interface ListingsModalParams {
  listingId?: string;
}

export interface EditBioModalParams {
  bio?: string;
}

export interface EditDetailsModalParams {
  modalType: "address" | "email" | "telephone";
}

export interface PreviewSubmissionModalParams {
  title: string;
}

// Map each modal ID to its parameter type
export interface ModalParamsMap {
  // Modals with specific params
  "listings": ListingsModalParams;
  "edit-bio": EditBioModalParams;
  "edit-details": EditDetailsModalParams;
  "preview-submission-modal": PreviewSubmissionModalParams;
  
  // Modals without specific params default to empty object
  "address-modal": DefaultParams;
  "vehicle-type-modal": DefaultParams;
  "unavailability-modal": DefaultParams;
  "hero-search-modal": DefaultParams;
  "vehicles-filter-modal": DefaultParams;
}

// Helper type to get params for a specific modal ID
export type ModalParamsFor<T extends ModalId> = T extends keyof ModalParamsMap 
  ? ModalParamsMap[T] 
  : DefaultParams;
