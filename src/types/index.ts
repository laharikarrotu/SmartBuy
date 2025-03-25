export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface CategoryImage {
  src: string;
  alt: string;
  category: string;
}

export interface PromotionalOffer {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface PopularPick {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
} 