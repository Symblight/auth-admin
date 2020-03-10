import { Request } from 'libs/api';
import _ from 'lodash';

export type TCar = {
  id: string | null;
  title: string;
  description?: string;
  price?: string;
  passenger?: string;
  color?: string;
  year?: string;
  category?: string;
  engine?: string;
  fuel?: string;
  bags?: string;
  image_url?: string;
  images_url?: string[];
};

export type TPagination = {
  total: string;
  perPage: number;
  page: number;
  lastPage: number;
};

export type TCategory = {
  id: string;
  title: string;
  image_url?: string;
};

export interface CarsStoreProps {
  loading: boolean;
  categories: TCategory[];
  vehicles: TCar[];
  pagination: TPagination;
  setCar: (value: TCar) => void;
  removeCar: (id: string) => void;
  editCar: (value: TCar) => void;
  getCar: (id: string) => void;
  setApiCar: (value: TCar) => void;
  getApiCars: (page: string | number) => void;
  getApiCar: (id: string) => void;
  getCategories: () => void;
}

export function carsStore(): CarsStoreProps {
  return {
    vehicles: [] as TCar[],
    pagination: { page: 1 } as TPagination,
    categories: [] as TCategory[],
    loading: true,
    setCar(value: TCar) {
      this.vehicles.push(value);
    },
    removeCar(id: string) {
      this.vehicles = this.vehicles.filter(car => car.id !== id);
    },
    editCar(value: TCar) {
      this.vehicles = this.vehicles.map(item =>
        value.id === item.id ? { ...item, ...value } : item,
      );
    },
    async getCar(id: string) {
      const car = this.vehicles.find(car => car.id === id);
      if (!car) {
        const res = await this.getApiCar(id);
        return res;
      }
      return car;
    },
    async setApiCar(value: TCar) {
      try {
        this.loading = true;
        await Request<TCar>({
          method: 'POST',
          url: '/vehicle',
          data: { ...value },
        });
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async getApiCars(page: string | number) {
      try {
        const response = await Request<any>({
          method: 'GET',
          url: `/vehicles?page=${page || 1}`,
        });

        this.vehicles = [...response.data];
        this.pagination = response;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async getApiCar(id: string) {
      try {
        this.loading = true;
        const response = await Request<TCar>({
          method: 'GET',
          url: `/vehicle/${id}`,
        });
        this.loading = false;
        return {
          ...response,
        };
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    async getCategories() {
      try {
        this.loading = true;
        const response = await Request<TCategory[]>({
          method: 'GET',
          url: `/categories`,
        });
        this.loading = false;
        this.categories = [...response];
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  };
}
