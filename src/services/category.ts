import { Category, CategoriesAPIResponse } from "@/models/category";

const BASE_URL = 'https://api.insany.co';


export const getCategories = async (): Promise<Category[]> => {
  try {
    const url = `${BASE_URL}/api/categories`;
    const response = await fetch(url, { next: { revalidate: 86400 } }); 

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data: CategoriesAPIResponse = await response.json();


    return data.categories;

  } catch (error) {
    console.error("Falha ao buscar categorias:", error);
    return []; 
  }
};