'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LuSearch, LuShoppingBag } from 'react-icons/lu';
import { useCart } from '@/contexts/cartContext'; 

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { cartCount } = useCart();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/busca?q=${searchTerm.trim()}`);
    }
  };

  return (
    <header className="bg-white text-gray-800 p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center"> 
        <Link href="/" className="text-3xl font-bold text-gray-800 mr-auto"> 
          InsanyShop
        </Link>
        
        <form 
          onSubmit={handleSearch} 
          className="flex-grow max-w-md mx-4 flex items-center bg-gray-100 rounded-lg p-2"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Procurando por algo específico?"
            className="flex-grow bg-transparent focus:outline-none text-sm"
          />
          <button type="submit" aria-label="Buscar">
            <LuSearch className="text-gray-500" size={20} />
          </button>
        </form>
        
        <div className="relative ml-auto"> 
          <Link href="/carrinho" aria-label="Ver carrinho de compras">
            <LuShoppingBag className="text-gray-800" size={28} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};