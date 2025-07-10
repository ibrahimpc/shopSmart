export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  skip: number;
  limit: number;
  cart: CartItem[];
  wishlist: Product[];
}

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';
export const LOAD_MORE_PRODUCTS_REQUEST = 'LOAD_MORE_PRODUCTS_REQUEST';
export const LOAD_MORE_PRODUCTS_SUCCESS = 'LOAD_MORE_PRODUCTS_SUCCESS';
export const LOAD_MORE_PRODUCTS_FAILURE = 'LOAD_MORE_PRODUCTS_FAILURE';
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';
export const ADD_ITEM_TO_WISHLIST = 'ADD_ITEM_TO_WISHLIST';
export const REMOVE_ITEM_FROM_WISHLIST = 'REMOVE_ITEM_FROM_WISHLIST';
