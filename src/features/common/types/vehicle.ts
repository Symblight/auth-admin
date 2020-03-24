export interface VehicleProps {
  id: number;
  brand: string;
  description?: string;
  price: string;
  image_url?: string;
}

export type TPagination = {
  total: string;
  perPage: number;
  page: number;
  lastPage: number;
};
