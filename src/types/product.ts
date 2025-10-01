export interface RequestProduct {
  name: string;
  price: number;
  description: string;
  stock: number;
  desktopImage?: File;  // optional, sadece seçilirse gönderilir
  tabletImage?: File;
  mobileImage?: File;
}
export interface ResponseProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  image?: ResponseProductImage;  // opsiyonel çünkü null olabilir
}
export interface ResponseProductImage {
  desktopUrl?: string;
  tabletUrl?: string;
  mobileUrl?: string;
  isMain: boolean;
}
