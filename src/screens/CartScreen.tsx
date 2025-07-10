import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AppText from '../components/AppText';
import {removeItemFromCart, updateCartItemQuantity} from '../redux/reducer/ProductAction';
import {Product, CartItem} from '../redux/reducer/ProductTypes';

interface RootState {
  products: {
    cart: CartItem[];
  };
}

const CartScreen: React.FC = () => {
  const dispatch = useDispatch() as any;
  const {cart} = useSelector((state: RootState) => state.products);

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeItemFromCart(productId));
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeItemFromCart(productId));
    } else {
      dispatch(updateCartItemQuantity(productId, newQuantity));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const renderCartItem = ({item}: {item: CartItem}) => (
    <View style={styles.cartItem}>
      <Image
        source={{uri: item.product.thumbnail}}
        style={styles.cartItemImage}
        resizeMode="contain"
      />
      <View style={styles.cartItemInfo}>
        <AppText text={item.product.title} fontSize={16} color="#1f2937" />
        <AppText text={`₹${item.product.price}`} fontSize={18} color="#059669" />
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
          >
            <AppText text="-" fontSize={16} color="#6b7280" />
          </TouchableOpacity>
          <AppText text={`${item.quantity}`} fontSize={16} color="#1f2937" />
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
          >
            <AppText text="+" fontSize={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveFromCart(item.product.id)}
      >
        <AppText text="🗑️" fontSize={16} />
      </TouchableOpacity>
    </View>
  );

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText text="Cart" fontSize={24} color="#1f2937" />
        </View>
        <View style={styles.emptyContainer}>
          <AppText text="Your cart is empty" fontSize={18} color="#6b7280" />
          <AppText text="Add some products to get started!" fontSize={14} color="#9ca3af" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText text="Cart" fontSize={24} color="#1f2937" />
        <AppText text={`${cart.length} items`} fontSize={14} color="#6b7280" />
      </View>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.product.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.totalContainer}>
        <AppText text="Total:" fontSize={18} color="#1f2937" />
        <AppText text={`₹${calculateTotal().toFixed(2)}`} fontSize={20} color="#059669" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  cartItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#f3f4f6',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default CartScreen;
