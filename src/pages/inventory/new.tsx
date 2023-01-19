import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Inventory as InventoryType,
  useInventory,
} from '@hooks/useInventories';
import { useProducts } from '@hooks/useProducts';

import { Option, Select } from '@components/Select';

import { setToLocalStorage } from '@utils/cache';

const Inventory: NextPage = () => {
  const router = useRouter();
  const [product, setProduct] = useState({
    id: 'invalid',
    label: 'None Selected',
  } as Option);

  const { inventories, error } = useInventory();
  const { products, error: productError } = useProducts();

  if (error || productError || !inventories || !products) {
    return <div>Erro ao carregar os produtos</div>;
  }

  const options = products?.map((product) => ({
    id: product.gtin,
    label: product.name,
  }));

  const handleSubmmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productFound = products.find(({ gtin }) => gtin === product.id);

    if (!productFound) return;

    const formData = new FormData(event.currentTarget);

    const from = new Date(formData.get('from') as string);
    const fromCpy = new Date(from);

    const { id: productId, validity: months } = productFound;

    const validity = new Date(fromCpy.setMonth(fromCpy.getMonth() + months));

    const newInventory: InventoryType = {
      id: inventories.length + 1,
      batch: formData.get('batch') as string,
      initialQuantity: Number(formData.get('quantity')),
      quantity: Number(formData.get('quantity')),
      from,
      productId,
      validity,
    };

    const updatedInventory = [...inventories, newInventory];

    setToLocalStorage('inventory', updatedInventory);

    router.push('/inventory');
  };

  return (
    <form
      onSubmit={handleSubmmit}
      className="mt-8 px-4 sm:px-6 lg:px-8 space-y-8 divide-y divide-gray-200"
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Criar Lote
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a forma abaixo para criar um novo lote
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Select
                label="Produto"
                options={options}
                selected={product}
                setSelected={setProduct}
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="batch"
                className="block text-sm font-medium text-gray-700"
              >
                Lote
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="batch"
                  id="batch"
                  autoComplete="batch"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700"
              >
                Fabricado em
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="date"
                  name="from"
                  id="from"
                  autoComplete="from"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantidade
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  autoComplete="quantity"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Link href="/inventory">Cancelar</Link>
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Inventory;
