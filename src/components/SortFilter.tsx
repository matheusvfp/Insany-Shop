'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export const SortFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (newSortValue) {
      params.set('sort', newSortValue);
    } else {
      params.delete('sort');
    }
    
    
    params.set('page', '1'); 

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center">
      <select
        id="sort"
        name="sort"
        onChange={handleSortChange}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">Organizar por</option>
        <option value="news">Novidades</option>
        <option value="price_asc">Preço: Menor - maior</option>
        <option value="price_desc">Preço: Maior - menor</option>
        <option value="rating_desc">Mais vendidos</option>
      </select>
    </div>
  );
};