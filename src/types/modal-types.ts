// Basic modals
export type AppModalIds =
  | "listings"
  | "edit-bio"
  | "edit-details"
  | "address-modal";

export type ModalId = AppModalIds;

export interface ListingsModalParams {
  listingId?: string;
}

export interface EditBioModalParams {
  bio?: string;
}

export interface EditDetailsModalParams {
  modalType: "address" | "email" | "telephone";
}

export interface ModalParamsMap {
  listings: ListingsModalParams;
  "edit-bio": EditBioModalParams;
  "edit-details": EditDetailsModalParams;
}
