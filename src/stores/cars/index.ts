import { Request } from 'libs/api';

export type TCar = {
  id?: string;
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
  bugs?: string;
};

export interface CarsStoreProps {
  vehicles: TCar[];
  setCat: (value: TCar) => void;
  removeCar: (id: string) => void;
  editCar: (value: TCar) => void;
  getCar: (id: string) => TCar;
  setApiCar: (value: TCar) => void;
  getApiCars: () => void;
  getApiCar: (id: string) => void;
}

export function carsStore() {
  return {
    vehicles: [] as TCar[],
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
        const response = await Request<TCar>({
          method: 'POST',
          url: '/vehicle',
          data: { ...value },
        });
        this.setCar(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getApiCars() {
      try {
        const response = await Request<TCar[]>({
          method: 'GET',
          url: '/vehicles?page=1',
        });
        this.vehicles = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getApiCar(id: string) {
      try {
        const response = await Request<TCar>({
          method: 'GET',
          url: `/vehicle/${id}`,
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };
}
