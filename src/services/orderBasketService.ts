import orderClient from "../api/orderClient";
import type { orderBasket } from "../types/orderBasket";

export const orderBasketService = {
  async getBasketById(orderBasketId: number): Promise<orderBasket> {
    return orderClient.get(`/orderbasket/${orderBasketId}`);
  },

  async getAllBaskets(): Promise<orderBasket[]> {
    return orderClient.get(`/orderbasket/getall`);
  },

  async getBasketByUserId(userId: number): Promise<orderBasket> {
    return orderClient.get(`/orderbasket/user/${userId}`);
  },

  async saveBasket(data: orderBasket): Promise<orderBasket> {
    return orderClient.post(`/orderbasket/save`, data);
  },

  async updateBasket(data: orderBasket): Promise<orderBasket> {
    return orderClient.put(`/orderbasket/update`, data);
  },

  async deleteBasketByBasketId(orderBasketId: number): Promise<string> {
    return orderClient.delete(`/orderbasket/delete/${orderBasketId}`);
  },
};
