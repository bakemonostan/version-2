// Basic modals
export type DashboardModalId = 
  | "listings" 

// About modals  


// All available modal IDs
export type ModalId = DashboardModalId;

// Modal params by ID
export interface ListingsModalParams {
  listingId?: string;
}

// Map modal IDs to their parameter types
export interface ModalParamsMap {
  listings: ListingsModalParams;
}

