import useSWR from 'swr';

export type Inventory = {
  id: number;
  productId: number;
  quantity: number;
  initialQuantity: number;
  validity: Date;
  from: Date;
  batch: string;
};

export const useInventory = () => {
  const { data: inventories, error } = useSWR<Inventory[]>('inventory');

  return {
    inventories,
    error,
    isLoading: !error && !inventories,
  };
};
