import orderClient from "../api/orderClient";
import type { orderItem, order } from "../types/order";

export const orderService = {
  async createOrder(userId: number, data: orderItem): Promise<order> {
    return orderClient.post(`/order/save/${userId}`, data);
  },

  async getOrderByUserId(userId: number): Promise<order[]> {
    return orderClient.get(`/order/get/${userId}`);
  },

  async getAllOrders(): Promise<order[]> {
    return orderClient.get(`/order/get`);
  },
};
