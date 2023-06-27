export interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
}

export interface CartProduct {
  product: Product;
  quantity: number;
}

export interface Cart {
  products: CartProduct[];
  total: number;
}
export interface Products {
  id: string;
  status: string;
  products: {
    product: {
      id: string;
      name: string;
      image: string;
    };
    quantity: number;
  }[];
  totalPrice: number;
}

export type Order = {
  loading: boolean;
  message: string;
  error: string;
  data: {
    orders: Products[];
  };
};
