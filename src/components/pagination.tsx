'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface PaginationControlsProps {
  totalPages: number;
  basePath?: string;
}

export const PaginationControls = ({
  totalPages,
  basePath = '/',
}: PaginationControlsProps) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const currentPage = Number(page);

  const generatePageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    }
    if (currentPage > totalPages - 3) {
      startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageNumber));
    return `${basePath}?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`flex items-center justify-center h-10 w-10 rounded-md border ${
          currentPage === 1 
            ? 'border-gray-200 text-gray-400 pointer-events-none' 
            : 'border-gray-300 text-gray-800 hover:bg-gray-100'
        }`}
        aria-disabled={currentPage === 1}
      >
        <LuChevronLeft size={20} />
      </Link>

      {pageNumbers.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={createPageURL(pageNumber)}
          className={`flex items-center justify-center h-10 w-10 rounded-md border text-sm font-medium ${
            currentPage === pageNumber
              ? 'bg-gray-600 text-white border-blue-600'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {pageNumber}
        </Link>
      ))}

      <Link
        href={createPageURL(currentPage + 1)}
        className={`flex items-center justify-center h-10 w-10 rounded-md border ${
          currentPage === totalPages 
            ? 'border-gray-200 text-gray-400 pointer-events-none' 
            : 'border-gray-300 text-gray-800 hover:bg-gray-100'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <LuChevronRight size={20} />
      </Link>
    </div>
  );
};
