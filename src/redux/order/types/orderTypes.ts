export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";
export const CLEAR_ORDERS = "CLEAR_ORDERS";

export interface Order {
  id: string;
  customer: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  amount: number;
  paymentMode: string;
  date: string;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
  product?: string;
  category?: string;
  quantity?: number;
  deliveryPartner?: string;
  rating?: number;
}

export interface OrdersState {
  loading: boolean;
  error: string | null;
  data: Order[];
}
