'use client'; 

import { Product } from '@/models/Product';
import { useCart } from '@/contexts/cartContext';
import { LuShoppingBag } from 'react-icons/lu';
import toast from 'react-hot-toast'; 

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} foi adicionado ao carrinho!`);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
    >
      <LuShoppingBag size={22} />
      Adicionar ao carrinho
    </button>
  );
};