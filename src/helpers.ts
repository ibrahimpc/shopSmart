export interface TabBarItem {
  icon: string;
  color: string;
  text: string;
  iconEmoji: string;
}

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

export const getTabBar = (item: string, currentTab?: string): TabBarItem => {
  const isActive = currentTab === item;

  switch (item) {
    case 'ProductList':
      return {
        icon: 'home',
        color: isActive ? '#2563EB' : '#6B7280',
        text: 'Products',
        iconEmoji: '🏪',
      };
    case 'cartScreen':
      return {
        icon: 'shopping-cart',
        color: isActive ? '#059669' : '#6B7280',
        text: 'Cart',
        iconEmoji: '🛒',
      };
    case 'profileScreen':
      return {
        icon: 'user',
        color: isActive ? '#DC2626' : '#6B7280',
        text: 'Profile',
        iconEmoji: '👤',
      };
    default:
      return {
        icon: 'home',
        color: '#6B7280',
        text: 'Home',
        iconEmoji: '🏠',
      };
  }
};

export const addToCart = (cart: CartItem[], product: Product): CartItem[] => {
  const existingCartItem = cart.find(item => item.product.id === product.id);

  if (existingCartItem) {
    return cart.map(item =>
      item.product.id === product.id
        ? {...item, quantity: item.quantity + 1}
        : item,
    );
  } else {
    return [...cart, {product, quantity: 1}];
  }
};

export const removeFromCart = (
  cart: CartItem[],
  productId: number,
): CartItem[] => {
  return cart.filter(item => item.product.id !== productId);
};

export const updateCartQuantity = (
  cart: CartItem[],
  productId: number,
  quantity: number,
): CartItem[] => {
  return cart.map(item =>
    item.product.id === productId ? {...item, quantity} : item,
  );
}; 