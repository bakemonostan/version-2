// import api from '@/config/api'
// import { type FilterableVehicles } from '@/types/allVehicles'
// import type { VehicleDetailsFormData } from '@/types/vehicleListingForm'
// import { handleGet } from '@/utils/general'

// export async function submitVehicleDetails(vehicleDetails: VehicleDetailsFormData) {
//   return api.post('/vehicle/detail', vehicleDetails)
// }

// export async function getfilterableListing(filters?: Record<string, string | number>) {
//   let url = '/vehicle/listing'
//   if (filters && Object.keys(filters).length > 0) {
//     const queryParams = new URLSearchParams()
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value !== null && value !== undefined && value !== '') {
//         queryParams.append(key, value.toString())
//       }
//     })
//     url += `?${queryParams.toString()}`
//   }
//   return handleGet<FilterableVehicles>(url)
// }
