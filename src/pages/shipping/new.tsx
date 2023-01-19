import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useInventory } from '@hooks/useInventories';
import { useProducts } from '@hooks/useProducts';
import { Shipping, useShipping } from '@hooks/useShipping';

import { Option, Select } from '@components/Select';

import { setToLocalStorage } from '@utils/cache';

const Product: NextPage = () => {
  const router = useRouter();

  const [product, setProduct] = useState({
    id: 'invalid',
    label: 'None Selected',
  } as Option);

  const { inventories, error: inventoryError } = useInventory();
  const { products, error: productError } = useProducts();
  const { shippings, error } = useShipping();

  if (
    error ||
    !shippings ||
    inventoryError ||
    !inventories ||
    productError ||
    !products
  ) {
    return <div>Erro ao carregar os produtos</div>;
  }

  const options = products.map((product) => ({
    id: product.gtin,
    label: product.name,
  }));

  const handleSubmmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const foundProduct = products.find((prod) => prod.gtin === product.id);

    if (!foundProduct) return;

    const { id: productId } = foundProduct;

    const filteredInventories = inventories.filter(
      (inventory) =>
        inventory.productId === productId && inventory.quantity > 0,
    );

    const [...inventoriesToRemove] = filteredInventories.sort(
      ({ validity: a }, { validity: b }) =>
        new Date(b).getTime() - new Date(a).getTime(),
    );

    const quantity = Number(formData.get('quantity'));

    const newShipping: Shipping = {
      id: shippings.length + 1,
      date: new Date(formData.get('date') as string),
      productId,
      quantity,
    };

    const updatedShippings = [...shippings, newShipping];

    const updatedInventories = inventoriesToRemove.reduce(
      (acc, inventory) => {
        if (acc.quantity === 0) return acc;

        let newQuantity = 0;

        const { quantity: inventoryQuantity } = inventory;

        if (acc.quantity <= inventoryQuantity) {
          newQuantity = inventoryQuantity - acc.quantity;

          acc.quantity = 0;
        }

        if (acc.quantity > inventoryQuantity) {
          acc.quantity -= inventoryQuantity;

          newQuantity = 0;
        }

        const updatedInventory = {
          ...inventory,
          quantity: newQuantity,
        };

        return {
          ...acc,
          inventories: [...acc.inventories, updatedInventory],
        };
      },
      { quantity, inventories: [] } as { quantity: number; inventories: any[] },
    );

    setToLocalStorage('shipping', updatedShippings);

    const updatedInventoriesIds = updatedInventories.inventories.map(
      ({ id }) => id,
    );

    setToLocalStorage('inventory', [
      ...updatedInventories.inventories,
      ...inventories.filter(({ id }) => !updatedInventoriesIds.includes(id)),
    ]);

    router.push('/shipping');
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
              Criar remessa
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Preencha os campos abaixo para criar uma nova remessa.
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
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Data
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="date"
                  name="date"
                  id="date"
                  autoComplete="date"
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
            <Link href="/shipping">Cancelar</Link>
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

export default Product;
