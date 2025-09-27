import productClient from "../api/productClient";
import type { requestProduct, responseProduct } from "../types/product";

export const productService = {
  async createProduct(data: requestProduct): Promise<responseProduct> {
    return productClient.post("/save", data);
  },

  async updateProductByProductId(
    data: requestProduct,
    productId: number
  ): Promise<responseProduct> {
    return productClient.put(`/update/${productId}`, data);
  },

  async deleteProductByProductId(productId: number): Promise<string> {
    return productClient.delete(`/delete/${productId}`);
  },

  async getProductByProductId(productId: number): Promise<responseProduct> {
    return productClient.get(`/get/${productId}`);
  },

  async getAllProducts(): Promise<responseProduct[]> {
    return productClient.get(`/get`);
  },
};
