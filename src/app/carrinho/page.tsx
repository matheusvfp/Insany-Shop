'use client'; 

import { useCart } from '@/contexts/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { LuMinus, LuPlus, LuTrash2 } from 'react-icons/lu';

export default function CartPage() {
  
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();


  const FRETE = 15.00;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + FRETE;

  
  if (cartCount === 0) {
    return (
      <div className="bg-gray-100 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Seu carrinho está vazio</h1>
        <p className="text-gray-500 mb-8">Parece que você ainda não adicionou nenhum produto.</p>
        <Link href="/" className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Explorar produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-80px)]">
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Seu Carrinho</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain' }} />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                <div className="flex items-center gap-3 mx-4">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full text-gray-600 hover:bg-gray-200"><LuMinus /></button>
                  <span className="font-semibold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full text-gray-600 hover:bg-gray-200"><LuPlus /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700"><LuTrash2 size={20} /></button>
              </div>
            ))}
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow-md h-fit lg:sticky lg:top-24">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Resumo do Pedido</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} itens)</span>
                <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>{FRETE.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
              <hr className="border-gray-200 my-2" />
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Finalizar Compra
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}