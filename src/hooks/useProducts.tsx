import useSWR from 'swr';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  validity: number;
  gtin: string;
  brand: string;
  image: string;
};

export const useProducts = () => {
  const { data: products, error } = useSWR<Product[]>('products');

  return {
    products,
    error,
    isLoading: !error && !products,
  };
};
