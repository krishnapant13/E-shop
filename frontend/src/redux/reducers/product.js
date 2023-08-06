import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  seller: null,
  error: null,
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // get all products of shop
  getAllProductShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductShopFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  //delete product of shop
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
