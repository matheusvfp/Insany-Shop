'use client'; 

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/models/product";
import { useCart } from "@/contexts/carContext";
import { LuStar, LuShoppingBag } from "react-icons/lu";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-start text-gray-800 h-full transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/produto/${product.id}`} className="block w-full h-48 relative overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          style={{ objectFit: 'contain', padding: '1rem' }} 
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" 
          className="hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow w-full">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="capitalize">{product.category}</span>
          <div className="flex items-center gap-1">
            <LuStar className="text-yellow-400" size={16} />
            <span className="font-semibold">{product.rating}</span>
          </div>
        </div>

        <Link href={`/produto/${product.id}`} className="font-semibold text-lg hover:text-blue-600 line-clamp-2 h-14">
          {product.name}
        </Link>

        <p className="text-sm text-gray-600 line-clamp-2 mt-1 mb-3 flex-grow">
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-gray-900">
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <span className="text-xs text-gray-500">{product.stock} em estoque</span>
          </div>
        </div>

        <button 
          onClick={handleAddToCart}
          className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors w-full flex items-center justify-center gap-2 font-semibold"
        >
          <LuShoppingBag size={18} />
          Adicionar
        </button>
      </div>
    </div>
  );
};