import { Request } from 'libs/api';
import _ from 'lodash';

export type TCar = {
  id: string | null;
  title: string;
  description?: string;
  imageUrl: string;
  price?: string;
  passenger?: string;
  color?: string;
  year?: string;
  carcase?: string;
  engine?: string;
  fuel?: string;
  bags?: string;
  imagesUrl: string[];
};

export type TPagination = {
  total: string;
  perPage: number;
  page: number;
  lastPage: number;
};

export interface CarsStoreProps {
  loading: boolean;
  vehicles: TCar[];
  pagination: TPagination;
  setCar: (value: TCar) => void;
  removeCar: (id: string) => void;
  editCar: (value: TCar) => void;
  getCar: (id: string) => void;
  setApiCar: (value: TCar) => void;
  getApiCars: (page: string | number) => void;
  getApiCar: (id: string) => void;
}

export function carsStore(): CarsStoreProps {
  return {
    vehicles: [] as TCar[],
    pagination: { page: 1 } as TPagination,
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
        const response = await Request<TCar>({
          method: 'POST',
          url: '/vehicle',
          data: { ...value },
        });
        this.setCar(response);
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async getApiCars(page: string | number) {
      try {
        if (this.pagination.page !== Number(page) || _.isEmpty(this.vehicles)) {
          const response = await Request<TCar[]>({
            method: 'GET',
            url: `/vehicles?page=${page || 1}`,
          });
          this.vehicles = response.data;
          this.pagination = response;
        }
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
        return response;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  };
}
