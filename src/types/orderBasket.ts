export interface orderBasketItem {
  id: number;
  productId: number;
  quantity: number;
}
export interface orderBasket {
  id: number;
  userId: number;
  items: orderBasketItem[];
}
