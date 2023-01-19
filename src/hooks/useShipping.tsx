import useSWR from 'swr';

export type Shipping = {
  id: number;
  productId: number;
  quantity: number;
  date: Date;
};

export const useShipping = () => {
  const { data: shippings, error } = useSWR<Shipping[]>('shipping');

  return {
    shippings,
    error,
    isLoading: !error && !shippings,
  };
};
