'use client';

import { Category } from '@/models/Category';
import { useRouter, usePathname } from 'next/navigation';

interface CategoryFilterProps {
  categories: Category[];
}
export const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const router = useRouter();
  const pathname = usePathname(); 

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    if (categoryId) {
    
      router.push(`/categoria/${categoryId}`);
    } else {
      
      router.push('/');
    }
  };

  const currentCategory = pathname.startsWith('/categoria/') ? pathname.split('/')[2] : '';

  return (
    <div className="flex items-center">
      <select
        id="category"
        name="category"
        onChange={handleCategoryChange}
        value={currentCategory} 
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">Todas as categorias</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
