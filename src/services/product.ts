import { Product, ProductsAPIResponse } from "@/models/product";

const BASE_URL = 'https://api.insany.co';


export interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}


export const getProducts = async (params: GetProductsParams = {}): Promise<ProductsAPIResponse> => {
  try {
    const queryParams = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 10),
    });

    if (params.category) queryParams.append('category', params.category);
    if (params.search) queryParams.append('search', params.search);

    const url = `${BASE_URL}/api/products?${queryParams.toString()}`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);

    return response.json();
  } catch (error) {
    console.error("Falha ao buscar produtos:", error);
    return {
      products: [],
      pagination: {
        currentPage: 1, totalPages: 1, totalProducts: 0,
        hasNextPage: false, hasPreviousPage: false,
      },
    };
  }
};


export const getProductById = async (id: number | string): Promise<Product | null> => {
  try {
    const url = `${BASE_URL}/api/products/${id}`;
    const response = await fetch(url, { next: { revalidate: 3600 } }); 
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Falha ao buscar produto com ID ${id}:`, error);
    return null;
  }
};