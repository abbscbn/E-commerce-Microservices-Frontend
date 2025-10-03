export interface orderBasketItem {
  id?: number;
  productId: number;
  quantity: number;
  price: number;
  name: string;
  productImgUrl?: string;
}
export interface orderBasket {
  id?: number;
  userId: number | undefined;
  items: orderBasketItem[];
}
