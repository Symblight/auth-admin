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

export type TCategory = {
  id: string;
  title: string;
  image_url?: string;
};

export * from './components';
