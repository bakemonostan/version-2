import api from "@/config/api";
import { ApiResponse, handleGet } from "@/utils/general";
import {
  Catergory,
  DropDataType,
  EquippedWithData,
  Features,
  Make,
  Model,
  SubCategories,
  TypeData,
} from "./types";
import useCustomQuery from "@/hooks/mutations/useCustomQuery";

export const getCategories = async () => {
  const res = await api.get<ApiResponse<Catergory[]>>("/dropdown/category");
  const data = res.data;
  console.log(data.data);
  return data;
};


export const getTypes = async (categoryID: string | undefined) => {
  return api.get<ApiResponse<TypeData[]>>(`/dropdown/type/${categoryID}`);
};

export const getGearboxDropdown = async () => {
  return api.get<ApiResponse<DropDataType[]>>(`/dropdown/gearbox`);
};
export const getFuelTypesDropdown = async () => {
  return api.get<ApiResponse<DropDataType[]>>(`/dropdown/fuel-type`);
};

export const getVehicleConditionDropdown = async () => {
  return api.get<ApiResponse<DropDataType[]>>(`/dropdown/conditions`);
};

export const getTransmissionDropdown = async () => {
  return api.get<ApiResponse<DropDataType[]>>(`/dropdown/transmission`);
};
export const getVehicleFeatures = async (id: string) => {
  return api.get<ApiResponse<SubCategories[]>>(`/dropdown/feature/${id}`);
};

export const getMakes = async (typeId: string | undefined) => {
  return api.get<ApiResponse<Make[]>>(`/dropdown/make/${typeId}`);
};

export const getModels = async (typeId: string | undefined) => {
  return api.get<ApiResponse<Model[]>>(`/dropdown/model/${typeId}`);
};

export const getEquippedWith = async () => {
  return api.get<ApiResponse<EquippedWithData>>(`/dropdown/equipped-with`);
};

export const getFeatures = async () => {
  return handleGet<Features[]>("/dropdown/feature");
};

export function useTypes(categoryId: string) {
  return useCustomQuery(["types", categoryId], () => getTypes(categoryId), {
    enabled: !!categoryId,
  });
}

export function useMakes(typeId: string) {
  return useCustomQuery(["makes", typeId], () => getMakes(typeId), {
    enabled: !!typeId,
  });
}

export function useModels(typeId: string) {
  return useCustomQuery(["models", typeId], () => getModels(typeId), {
    enabled: !!typeId,
  });
}
