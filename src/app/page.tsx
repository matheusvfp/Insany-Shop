import { getProducts } from "@/services/product";
import { getCategories } from "@/services/category";
import { PaginationControls } from "@/components/pagination";
import { CategoryList } from "@/components/category";
import { ProductCard } from "@/components/productCard"; 

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const pageParam = searchParams.page;
  const currentPage = Number(pageParam) || 1;

  const [productsResponse, categories] = await Promise.all([
    getProducts({ page: currentPage, limit: 8 }),
    getCategories()
  ]);

  const { products, pagination } = productsResponse;

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Todos os produtos
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <PaginationControls
          totalPages={pagination.totalPages}
        />
      </main>

      <div className="bg-white">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
}