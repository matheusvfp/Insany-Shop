// src/app/categoria/[slug]/page.tsx

import { getCategories } from "@/services/category";
import { getProducts } from "@/services/product";
import { PaginationControls } from "@/components/pagination";
import { CategoryList } from "@/components/category";
import { ProductCard } from "@/components/productCard"; 
import { SortFilter } from "@/components/SortFilter";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string; sort?: string };
}) {
  const pageParam = searchParams.page;
  const currentPage = Number(pageParam) || 1;
  const sortParam = searchParams.sort; 

  const [productsResponse, allCategories] = await Promise.all([
    getProducts({
      category: params.slug,
      page: currentPage,
      limit: 8,
      sort: sortParam, 
    }),
    getCategories(),
  ]);

  const { products, pagination } = productsResponse;

  const categoryName = allCategories.find(cat => cat.id === params.slug)?.name || params.slug;

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 p-4 rounded-lg text-gray-800">
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-black-600">{categoryName}</span>
          </h1>
          <SortFilter />
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum produto encontrado nesta categoria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <PaginationControls
          totalPages={pagination.totalPages}
          basePath={`/categoria/${params.slug}`} 
        />
      </main>
      
      <div className="bg-gray">
        <CategoryList categories={allCategories} />
      </div>
    </div>
  );
}
