import { getProducts } from "@/services/product";
import { getCategories } from "@/services/category";
import { PaginationControls } from "@/components/pagination";
import { CategoryList } from "@/components/category";
import { ProductCard } from "@/components/productCard"; 
import { SortFilter } from "@/components/SortFilter";
import { CategoryFilter } from "@/components/CategoryFilter";


export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; sort?: string};
}) {
  const pageParam = searchParams.page;
  const currentPage = Number(pageParam) || 1;
  const sortParam = searchParams.sort;

  const [productsResponse, categories] = await Promise.all([
    getProducts({ page: currentPage, limit: 8, sort: sortParam }),
    getCategories()
  ]);

  const { products, pagination } = productsResponse;

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col mb-6 gap-4 bg-gray p-4 rounded-lg">
          
          <div className="flex flex-col md:flex-row md:justify-between items-stretch md:items-center w-full text-gray-800 gap-4">
            <CategoryFilter categories={categories} />
            <SortFilter />
          </div>

         
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Todos os produtos
          </h1>
        </div>

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

      <div className="bg-gray">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
}