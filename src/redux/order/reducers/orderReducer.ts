import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    type OrdersState,
  } from "../types/orderTypes";
  
  const initialState: OrdersState = {
    loading: false,
    error: null,
    data: [],
  };
  
  export default function orderReducer(state = initialState, action: any): OrdersState {
    switch (action.type) {
      case FETCH_ORDERS_REQUEST:
        return { 
            ...state, 
            loading: true, 
            error: null 
        };
      case FETCH_ORDERS_SUCCESS:
        return { 
            ...state, 
            loading: false, 
            data: action.payload 
        };
      case FETCH_ORDERS_FAILURE:
        return { 
            ...state, 
            loading: false, 
            error: action.payload 
        };
      default:
        return state;
    }
  }
  