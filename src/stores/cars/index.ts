import { Request } from 'libs/api';

type TCar = {
  id: string;
  name: string;
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
  cars: TCar[];
}

export function carsStore() {
  return {
    cars: [] as TCar[],
    setCar(value: TCar) {
      this.cars.push(value);
    },
    removeCar(id: string) {
      this.cars = this.cars.filter(car => car.id !== id);
    },
    editCar(value: TCar) {
      this.cars = this.cars.map(item => (value.id === item.id ? { ...item, ...value } : item));
    },
    async setApiCar(value: TCar) {
      try {
        const response = await Request({
          method: 'POST',
          url: '/vehicle',
          data: { ...value },
        });
        this.setCar(response.data);
      } catch (error) {
        console.log(error);
      }
    },
  };
}
