import { getProductById } from "@/services/product";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton"; 

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  const productResponse = await getProductById(productId);
  const product = productResponse?.product;

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          
          <div className="relative w-full h-96">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col text-gray-800">
            <div>
              <span className="text-sm text-gray-500 capitalize">{product.category} / {product.brand}</span>
              <h1 className="text-4xl font-bold my-2">{product.name}</h1>
              <div className="flex items-center gap-1 text-yellow-500">
                <span>⭐ {product.rating}</span>
              </div>
              <p className="text-gray-600 mt-4">{product.description}</p>
            </div>
            
            <div className="my-6">
              <p className="text-5xl font-extrabold text-gray-900">
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
              <p className="text-green-600 text-sm font-semibold mt-1">{product.stock} unidades em estoque</p>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </main>
    </div>
  );
}