import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  LOAD_MORE_PRODUCTS_REQUEST,
  LOAD_MORE_PRODUCTS_SUCCESS,
  LOAD_MORE_PRODUCTS_FAILURE,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  ADD_ITEM_TO_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST,
  Product,
  CartItem,
} from './ProductTypes';
export const getProductsRequest = () => ({
  type: GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = (
  products: Product[],
  total: number,
  skip: number,
  limit: number,
) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: {
    products,
    total,
    skip,
    limit,
  },
});

export const getProductsFailure = (error: string) => ({
  type: GET_PRODUCTS_FAILURE,
  payload: error,
});

export const loadMoreProductsRequest = () => ({
  type: LOAD_MORE_PRODUCTS_REQUEST,
});

export const loadMoreProductsSuccess = (
  products: Product[],
  total: number,
  skip: number,
  limit: number,
) => ({
  type: LOAD_MORE_PRODUCTS_SUCCESS,
  payload: {
    products,
    total,
    skip,
    limit,
  },
});

export const loadMoreProductsFailure = (error: string) => ({
  type: LOAD_MORE_PRODUCTS_FAILURE,
  payload: error,
});

export const addItemToCart = (product: Product) => ({
  type: ADD_ITEM_TO_CART,
  payload: product,
});

export const removeItemFromCart = (productId: number) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: productId,
});

export const updateCartItemQuantity = (productId: number, quantity: number) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: {productId, quantity},
});

export const addItemToWishlist = (product: Product) => ({
  type: ADD_ITEM_TO_WISHLIST,
  payload: product,
});

export const removeItemFromWishlist = (productId: number) => ({
  type: REMOVE_ITEM_FROM_WISHLIST,
  payload: productId,
});
