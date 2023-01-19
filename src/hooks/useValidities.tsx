import useSWR from 'swr';

export type Validity = {
  id: number;
  inventoryId: number;
};

export const useValidity = () => {
  const { data: validities, error } = useSWR<Validity[]>('validity');

  return {
    inventories: validities,
    error,
    isLoading: !error && !validities,
  };
};
