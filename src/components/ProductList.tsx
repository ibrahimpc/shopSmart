import React, {memo} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AppText from './AppText';
import {
  addItemToCart,
  addItemToWishlist,
  removeItemFromWishlist,
} from '../redux/reducer/ProductAction';
import {Product} from '../redux/reducer/ProductTypes';

interface ProductItemProps {
  product: Product;
  isInWishlist: boolean;
  isInCart: boolean;
  cartQuantity: number;
}

const ProductItem: React.FC<ProductItemProps> = memo(
  ({product, isInWishlist, isInCart, cartQuantity}) => {
    const dispatch = useDispatch() as any;

    const handleAddToCart = () => {
      dispatch(addItemToCart(product));
    };

    const handleWishlistToggle = () => {
      if (isInWishlist) {
        dispatch(removeItemFromWishlist(product.id));
      } else {
        dispatch(addItemToWishlist(product));
      }
    };

    return (
      <TouchableOpacity style={styles.productCard}>
        <View style={styles.productImage}>
          <Image
            source={{uri: product.thumbnail}}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.productInfo}>
          <AppText text={product.title} fontSize={16} color="#1f2937" />
          <AppText text={`₹${product.price}`} fontSize={18} color="#059669" />
          <View style={styles.ratingContainer}>
            <AppText text="⭐ " fontSize={14} />
            <AppText text={`${product.rating}`} fontSize={14} color="#6b7280" />
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                isInCart && styles.actionButtonActive,
              ]}
              onPress={handleAddToCart}>
              <View style={styles.cartButtonContent}>
                <AppText text="🛒" fontSize={16} />
                {isInCart && cartQuantity > 0 && (
                  <View style={styles.quantityBadge}>
                    <AppText
                      text={cartQuantity.toString()}
                      fontSize={10}
                      color="#ffffff"
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                isInWishlist && styles.actionButtonActive,
              ]}
              onPress={handleWishlistToggle}>
              <AppText text={isInWishlist ? '❤️' : '🤍'} fontSize={16} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.isInWishlist === nextProps.isInWishlist &&
      prevProps.isInCart === nextProps.isInCart &&
      prevProps.cartQuantity === nextProps.cartQuantity
    );
  },
);

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    gap: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 6,
    flex: 0.48,
    alignItems: 'center',
  },
  actionButtonActive: {
    backgroundColor: '#dbeafe',
  },
  cartButtonContent: {
    position: 'relative',
    alignItems: 'center',
  },
  quantityBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductItem; 