export interface Category {
  id: string; 
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

export interface CategoriesAPIResponse {
  categories: Category[];
}