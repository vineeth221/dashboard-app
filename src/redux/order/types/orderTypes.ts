export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";
export const CLEAR_ORDERS = "CLEAR_ORDERS";

export interface Order {
  id: string;

  vendor: string;

  status:
    | "Paid"
    | "Pending"
    | "Overdue"
    | "Duplicate Risk"
    | "Processing";

  amount: number;

  paymentMode: string;

  invoiceDate: string;

  dueDate: string;

  city?: string;

  state?: string;

  email?: string;

  category?: string;

  invoiceType?: string;

  riskScore?: number;

  duplicateProbability?: number;
}

export interface OrdersState {
  loading: boolean;
  error: string | null;
  data: Order[];
}