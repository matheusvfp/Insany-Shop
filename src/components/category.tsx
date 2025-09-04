import { Category } from "@/models/Category"
import Link from "next/link";

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <section className="container mx-auto p-4 mt-12 bg-gray-100"> {/* Alterando para bg-gray-100 */}
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        Principais categorias
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categoria/${category.id}`}
            className="border border-gray-700 bg-gray-900 text-white rounded-lg py-3 px-6 text-center hover:bg-gray-800 transition-colors"
          >
            <p className="font-semibold">{category.name}</p>
            <span className="text-sm text-gray-400">
              {category.productCount} produtos
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};