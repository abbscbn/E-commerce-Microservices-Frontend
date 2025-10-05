import productClient from "../api/productClient";
import type { RequestProduct, ResponseProduct } from "../types/product";

export const productService = {
  async createProduct(data: RequestProduct): Promise<ResponseProduct> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("stock", String(data.stock));

    if (data.desktopImage) formData.append("desktopImage", data.desktopImage);
    if (data.tabletImage) formData.append("tabletImage", data.tabletImage);
    if (data.mobileImage) formData.append("mobileImage", data.mobileImage);

    return productClient.post("/save", formData, {
      headers: { "Content-Type": "multipart/form-data" }, // JSON yerine form-data
    });
  },

  async updateProductByProductId(
    productId: number,
    data: RequestProduct
  ): Promise<ResponseProduct> {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("stock", String(data.stock));

    if (data.desktopImage) formData.append("desktopImage", data.desktopImage);
    if (data.tabletImage) formData.append("tabletImage", data.tabletImage);
    if (data.mobileImage) formData.append("mobileImage", data.mobileImage);

    return productClient.put(`/update/${productId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async deleteProductByProductId(productId: number): Promise<string> {
    return productClient.delete(`/delete/${productId}`);
  },

  async getProductByProductId(productId: number | null): Promise<ResponseProduct> {
    return productClient.get(`/get/${productId}`);
  },

  async getAllProducts(): Promise<ResponseProduct[]> {
    return productClient.get(`/get`);
  },
  async getAllProductsWithPageable(page: number, size: number) {
    return productClient.get(`/getpageable?page=${page}&size=${size}`);
  },
};
