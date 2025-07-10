import {call, put, takeLatest, select} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_PRODUCTS_REQUEST,
  LOAD_MORE_PRODUCTS_REQUEST,
  Product,
} from '../reducer/ProductTypes';
import {
  getProductsSuccess,
  getProductsFailure,
  loadMoreProductsSuccess,
  loadMoreProductsFailure,
} from '../reducer/ProductAction';
const fetchProductsAPI = async (skip: number, limit: number) => {
  const response = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
  );
  return response.data;
};
function* getProductsSaga() {
  try {
    const data: {
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    } = yield call(fetchProductsAPI, 0, 10);

    yield put(
      getProductsSuccess(data.products, data.total, data.skip, data.limit),
    );
  } catch (error: any) {
    yield put(getProductsFailure(error.message || 'Failed to get products'));
  }
}
function* loadMoreProductsSaga() {
  try {
    const state: any = yield select();
    const currentSkip = state.products.skip;
    const limit = state.products.limit;

    const data: {
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    } = yield call(fetchProductsAPI, currentSkip, limit);

    yield put(
      loadMoreProductsSuccess(data.products, data.total, data.skip, data.limit),
    );
  } catch (error: any) {
    yield put(loadMoreProductsFailure(error.message));
  }
}
export function* productSaga() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductsSaga);
  yield takeLatest(LOAD_MORE_PRODUCTS_REQUEST, loadMoreProductsSaga);
}
