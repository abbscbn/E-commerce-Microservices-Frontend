export interface orderItem {
  productId: number;
  quantity: number;
  price: number;
}
export interface order {
  id: number;
  userId: number;
  items: orderItem[];
  totalPrice: number;
  status: string;
  failedMessages: failedMessage[] | null;
  createDate: Date;
  userValidated: boolean;
  productValidated: boolean;
}
export interface failedMessage {
  id: number;
  userId: number | null;
  productId: number | null;
  message: string;
}
