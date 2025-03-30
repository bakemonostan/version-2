// Basic modals
export type DashboardModalId = "listings" | "edit-bio" | "edit-details";

export type ModalId = DashboardModalId;

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
