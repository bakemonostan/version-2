"use client";

import { useState, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import useInvalidateQuery from "@/hooks/mutations/useInvalidateQuery";
import VehicleCard from "../_components/VehicleCard";
import { fetchVehicles, getfilterableListing } from "@/services/vehicleListing";
import AllVehiclesHeader from "../_components/AllVehiclesHeader";
import AllVehiclesSkeletonLoader from "../_components/AllVehiclesSkeletonLoader";
import AllVehiclesPagination from "../_components/AllVehiclesPagination";
import HeroSearchComponent from "@/app/(landing)/_components/shared/HeroSearchComponent";
import FilterComponent, { DEFAULT_FILTER_VALUES } from "../_components/FilterComponent";
import { FilterableVehicles, Vehicle } from "@/types/allVehicles";
import { ApiResponse } from "@/types/global";
import { useModal } from "@/providers/ModalContext";

interface FilterValues {
  price_per_day: number;
  rating: number;
  sort_by: "Lowest price" | "Highest price";
  instant_bookings: boolean;
}

export default function AllVehiclesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState<string>("10");
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const { refetchQuery } = useInvalidateQuery();
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["vehicles", currentPage, perPage, filters, areFiltersApplied],
    queryFn: async () => {
      if (areFiltersApplied && Object.keys(filters).length > 0) {
        const filteredData = await getfilterableListing({ 
          ...filters, 
          page: currentPage, 
          per_page: perPage 
        });
        return { 
          data: filteredData,
          status: true,
          message: "Success"
        } as ApiResponse<FilterableVehicles>;
      }
      return fetchVehicles(currentPage, perPage);
    },
  });

  const vehicles = data?.data?.data || [];
  const totalPages = data?.data?.meta?.last_page || 1;
  const totalVehicles = data?.data?.meta?.total || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowAllVehicles = () => {
    setCurrentPage(1);
    setFilters({});
    setAreFiltersApplied(false);
    refetchQuery({ queryKey: ["vehicles"] });
  };

  const handlePerPageChange = (value: string) => {
    setPerPage(value);
    setCurrentPage(1); 
  };

  const handleFilterChange = useCallback((filterValues: FilterValues) => {
    const newFilters: Record<string, string | number> = {};
    
    if (filterValues.price_per_day) {
      newFilters.price_per_day = filterValues.price_per_day;
    }
    
    if (filterValues.rating) {
      newFilters.rating = filterValues.rating;
    }
    
    if (filterValues.sort_by) {
      newFilters.sort_by = filterValues.sort_by === "Lowest price" ? "asc" : "desc";
    }
    
    if (filterValues.instant_bookings) {
      newFilters.instant_bookings = 1;
    }
    

    const isDefault = 
      filterValues.price_per_day === DEFAULT_FILTER_VALUES.price_per_day && 
      filterValues.rating === DEFAULT_FILTER_VALUES.rating && 
      filterValues.sort_by === DEFAULT_FILTER_VALUES.sort_by && 
      filterValues.instant_bookings === DEFAULT_FILTER_VALUES.instant_bookings;
    
    setFilters(newFilters);
    setAreFiltersApplied(!isDefault && Object.keys(newFilters).length > 0);
    setCurrentPage(1); // Reset to first page when applying filters
  }, []);

  const { openModal } = useModal();

  return (
    <section className="mx-auto p-5 w-full lg:max-w-[79.5rem]" id="all-vehicles-page">
      <div>
        <div className="py-8 sm:block hidden" >
          <HeroSearchComponent  />
        </div>
        <div
          onClick={() => openModal("vehicles-filter-modal")}
          className="flex gap-4 justify-center px-6 py-3 mx-auto my-8 w-3/4 rounded-3xl border cursor-pointer sm:hidden">
          <SlidersHorizontal className="text-black/50" />
          <p className="text-sm font-bold text-black/50">Select filters</p>
        </div>
      </div>

      <AllVehiclesHeader
        totalVehicles={totalVehicles}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
        onShowAllVehicles={handleShowAllVehicles}
      />

      <div className="grid grid-cols-1 gap-5 py-4 lg:grid-cols-12">
        <div className="hidden lg:block lg:col-span-3">
          <FilterComponent onFilterChange={handleFilterChange} />
        </div>
        <div className="grid gap-x-3 gap-y-[3.75rem] sm:grid-cols-12 lg:col-span-9">
          {isLoading ? (
            <div className="col-span-12 grid grid-cols-1 sm:grid-cols-12 gap-5">
              <AllVehiclesSkeletonLoader
                count={parseInt(perPage)}
                showSpinner={false}
              />
            </div>
          ) : isError ? (
            <div className="col-span-full text-center py-10 text-red-500">
              Error loading vehicles: {error.message}
            </div>
          ) : vehicles.length === 0 ? (
            <div className="col-span-full text-center py-10">
              No vehicles found
            </div>
          ) : (
            vehicles.map((vehicle: Vehicle) => (
              <div
                key={vehicle.id}
                className="w-full sm:col-span-6 lg:col-span-4">
                <VehicleCard vehicle={vehicle} />
              </div>
            ))
          )}
        </div>
      </div>

      <AllVehiclesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        isError={isError}
        hasItems={vehicles.length > 0}
      />
    </section>
  );
}
