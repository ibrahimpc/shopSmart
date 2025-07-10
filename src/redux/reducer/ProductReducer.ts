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
  ProductState,
  CartItem,
} from './ProductTypes';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  hasMore: true,
  skip: 0,
  limit: 10,
  cart: [],
  wishlist: [],
};

const productReducer = (
  state: ProductState = initialState,
  action: any,
): ProductState => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        hasMore:
          action.payload.skip + action.payload.limit < action.payload.total,
        skip: action.payload.skip + action.payload.limit,
        limit: action.payload.limit,
        error: null,
      };

    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOAD_MORE_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOAD_MORE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, ...action.payload.products],
        hasMore:
          action.payload.skip + action.payload.limit < action.payload.total,
        skip: action.payload.skip + action.payload.limit,
        limit: action.payload.limit,
        error: null,
      };

    case LOAD_MORE_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_ITEM_TO_CART:
      const existingCartItem = state.cart.find(
        item => item.product.id === action.payload.id,
      );
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, {product: action.payload, quantity: 1}],
        };
      }

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };

    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? {...item, quantity: action.payload.quantity}
            : item,
        ),
      };

    case ADD_ITEM_TO_WISHLIST:
      const isInWishlist = state.wishlist.some(
        item => item.id === action.payload.id,
      );
      if (!isInWishlist) {
        return {
          ...state,
          wishlist: [...state.wishlist, action.payload],
        };
      }
      return state;

    case REMOVE_ITEM_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default productReducer;