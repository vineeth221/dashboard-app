import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    CLEAR_ORDERS,
    type Order,
  } from "../types/orderTypes";
  
  export const fetchOrdersRequest = () => ({
     type: FETCH_ORDERS_REQUEST 
    });

  export const fetchOrdersSuccess = (payload: Order[]) => ({ 
    type: FETCH_ORDERS_SUCCESS, 
    payload 
  });

  export const fetchOrdersFailure = (payload: string) => ({
     type: FETCH_ORDERS_FAILURE, 
     payload 
    });

  export const clearOrders = () => ({
    type: CLEAR_ORDERS,
  });
  