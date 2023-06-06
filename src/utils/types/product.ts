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
