import { NextPage } from 'next';
import Link from 'next/link';

import { useInventory } from '@hooks/useInventories';
import { useProducts } from '@hooks/useProducts';

import { Notification } from '@components/Notification';

const Products: NextPage = () => {
  const { inventories, error } = useInventory();
  const { products, error: productError } = useProducts();

  const inventoriesWithProducts = inventories
    ?.map((inventory) => {
      const product = products?.find(
        (product) => product.id === inventory.productId,
      );

      return {
        ...inventory,
        product,
      };
    })
    .sort(
      ({ validity: a }, { validity: b }) =>
        new Date(a).getTime() - new Date(b).getTime(),
    );

  if (error || productError) {
    return <div>Erro ao carregar os produtos</div>;
  }

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Inventário</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gerencie os lotes da sua loja.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Link href="/inventory/new">Novo Lote</Link>
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Lote
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Fabricado em
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Quantidade
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Valido até
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {inventoriesWithProducts?.map((inventory) => (
                    <tr
                      key={inventory.id}
                      className="border first:border-yellow-300 first:bg-yellow-50"
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {inventory.product?.name}
                            </div>
                            <div className="text-gray-500">
                              {inventory.batch}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">
                          {new Date(inventory.from).toLocaleDateString('pt-BR')}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {inventory.quantity}/{inventory.initialQuantity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">
                          {new Date(inventory.validity).toLocaleDateString(
                            'pt-BR',
                          )}
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href={`/inventory/${inventory.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                          <span className="sr-only">, {inventory.batch}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Products;
