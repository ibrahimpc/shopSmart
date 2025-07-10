import React, {useEffect} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AppText from '../components/AppText';
import ProductItem from '../components/ProductList';
import {
  getProductsRequest,
  loadMoreProductsRequest,
} from '../redux/reducer/ProductAction';
import {Product} from '../redux/reducer/ProductTypes';

interface RootState {
  products: {
    products: Product[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    skip: number;
    limit: number;
    cart: any[];
    wishlist: Product[];
  };
}

const ProductListScreen: React.FC = () => {
  const dispatch = useDispatch() as any;
  const {products, loading, error, hasMore, cart, wishlist} = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(getProductsRequest());
  }, [dispatch]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(loadMoreProductsRequest());
    }
  };

  const renderProductItem = ({item}: {item: Product}) => {
    const isInWishlist = wishlist?.some(
      wishlistItem => wishlistItem?.id === item?.id,
    );
    const cartItem = cart?.find(cartItem => cartItem?.product?.id === item?.id);
    const isInCart = !!cartItem;
    const cartQuantity = cartItem?.quantity || 0;

    return (
      <ProductItem
        product={item}
        isInWishlist={isInWishlist}
        isInCart={isInCart}
        cartQuantity={cartQuantity}
      />
    );
  };

  const handleRetry = () => {
    dispatch(getProductsRequest());
  };

  if (loading && products.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText text="Products" fontSize={24} color="#1f2937" />
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#059669" />
          <AppText text="Loading products..." fontSize={16} color="#6b7280" />
        </View>
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText text="Products" fontSize={24} color="#1f2937" />
        </View>
        <View style={styles.centerContainer}>
          <AppText
            text="Failed to load products"
            fontSize={16}
            color="#dc2626"
          />
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <AppText text="Retry" fontSize={16} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText text="Products" fontSize={24} color="#1f2937" />
        {/* <AppText
          text={`${products.length} items`}
          fontSize={14}
          color="#6b7280"
        /> */}
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingFooter}>
              <ActivityIndicator size="small" color="#059669" />
              <AppText text="Loading more..." fontSize={14} color="#6b7280" />
            </View>
          ) : null
        }
      />
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
  row: {
    justifyContent: 'space-between',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default ProductListScreen;
