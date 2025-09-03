import { getProducts } from "@/services/product";
import { getCategories } from "@/services/category";
import Image from "next/image";
import { PaginationControls } from "@/components/pagination";
import { CategoryList } from "@/components/category"; 

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;


  const [productsResponse, categories] = await Promise.all([
    getProducts({ page: currentPage, limit: 8 }),
    getCategories()
  ]);

  const { products, pagination } = productsResponse;

  return (
    <div className="bg-gray-950 min-h-screen">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-8 text-white">
          Bem-vindo à Insany Shop
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-white">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-700 bg-gray-900 text-white rounded-lg p-4 flex flex-col items-center shadow-lg">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <h2 className="text-lg font-semibold text-center h-14">{product.name}</h2>
                <p className="text-xl font-bold text-blue-400 mt-2">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <button className="mt-4 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors w-full">
                  Ver Produto
                </button>
              </div>
            ))}
          </div>
        )}
        
        <PaginationControls
          totalPages={pagination.totalPages}
        />
      </main>

      <CategoryList categories={categories} />
    </div>
  );
}