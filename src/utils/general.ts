import api from "@/config/api";
import axios from "axios";
export interface ApiResponse<T> {
  message: string;
  status: boolean;
  data: T;
}

export const handlePost = async <T>(
  url: string,
  values?: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await api.post<ApiResponse<T>>(url, values);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export const handleGet = async <T>(url: string): Promise<T> => {
  try {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export function formatDate(date: Date | string | null | undefined, format?: 'Y/m/d' | null): string {
  if (!date) return '';
  
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  if (format === 'Y/m/d') {
    return `${year}/${month}/${day}`;
  }
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

export const formatCurrencyToEuros = (price: number) => {
  if (isNaN(price)) {
    return '€0.00'
  }

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return formatter.format(price)
}

export const calculateVat = (price: number, vat: number) => {
  const vatAmount = (price * vat) / 100
  return formatCurrencyToEuros(vatAmount)
}

export const calculatePriceAfterVat = (price: number, vat: number) => {
  const vatAmount = calculateVat(price, vat)
  const vatAmountNumber = parseFloat(vatAmount.replace('€', '').replace(',', '.'))
  const priceAfterVat = price - vatAmountNumber
  return formatCurrencyToEuros(priceAfterVat)
}
