import { getProducts } from "@/services/product";
import { getCategories } from "@/services/category";
import { PaginationControls } from "@/components/pagination";
import { ProductCard } from "@/components/productCard";
import { CategoryList } from "@/components/category";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  
  const searchTermParam = searchParams.q;
  const searchTerm = searchTermParam || '';
  const pageParam = searchParams.page;
  const currentPage = Number(pageParam) || 1;

  
  const [apiResponse, categories] = await Promise.all([
    getProducts({
      search: searchTerm,
      page: currentPage,
      limit: 8,
    }),
    getCategories()
  ]);
  
  const { products, pagination } = apiResponse;

  return (
    
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Resultados para: <span className="text-blue-600">{searchTerm}</span>
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum produto encontrado para sua busca.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <PaginationControls
          totalPages={pagination.totalPages}
          basePath={`/busca?q=${searchTerm}`} 
        />
      </main>

     
      <div className="bg-gray">
        <CategoryList categories={categories} />
      </div>
    </div>
  );
}