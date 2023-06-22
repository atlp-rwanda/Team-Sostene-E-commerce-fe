import { JwtPayload } from 'jwt-decode';

export interface products {
  product: {
    id: string;
    image: string;
    name: string;
    price: number;
  };
}
export interface OrderObject {
  createdAt: string;
  id: string;
  products: products[];
  shippingId: string;
  status: string;
  totalPrice: number;
  updatedAt: string;
  userId: string;
}
export interface ShippingAddress {
  shippingAddress: {
    city: string;
    country: string;
    postalCode: string;
    streetAddress: string;
    phoneNumber: string;
  } | null;
}
export interface PaymentBody {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}
export interface DecodedToken extends JwtPayload {
  email: string;
  username: string;
  status: string;
}
