import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useProducts } from '@hooks/useProducts';

import { setToLocalStorage } from '@utils/cache';

const Product: NextPage = () => {
  const router = useRouter();

  const { products, error } = useProducts();

  if (error || !products) {
    return <div>Erro ao carregar os produtos</div>;
  }

  const handleSubmmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newProduct = {
      id: products.length + 1,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      gtin: formData.get('gtin') as string,
      brand: formData.get('brand') as string,
      image: formData.get('image') as string,
      validity: Number(formData.get('validity')),
    };

    const updatedProducts = [...products, newProduct];

    setToLocalStorage('products', updatedProducts);

    router.push('/products');
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
              Criar Product
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a forma abaixo para criar um novo produto
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Preço
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  R$
                </span>
                <input
                  type="number"
                  name="price"
                  id="price"
                  autoComplete="price"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="gtin"
                className="block text-sm font-medium text-gray-700"
              >
                Código de barras
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="gtin"
                  id="gtin"
                  autoComplete="gtin"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Marca
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  autoComplete="brand"
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="validity"
                className="block text-sm font-medium text-gray-700"
              >
                Validade
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="validity"
                  id="validity"
                  autoComplete="validity"
                  className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                  meses
                </span>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descrição
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Escreva sobre o produto.
              </p>
            </div>

            <div className="sm:col-span-6">
              <span className="block text-sm font-medium text-gray-700">
                Photo
              </span>
              <div className="mt-1 flex items-center">
                <span className="h-12 w-12 overflow-hidden rounded-full bg-cover bg-center bg-gray-300"></span>
                <button
                  type="button"
                  className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <label htmlFor="image">
                    <span>Change</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </button>
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
            <Link href="/products">Cancelar</Link>
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
