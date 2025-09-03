export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; 
  stock: number;
  rating: number;
  brand: string;
}

export interface ProductsAPIResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}