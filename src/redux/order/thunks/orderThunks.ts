import type { AppDispatch } from "@/redux/store";
import {
    fetchOrdersFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
} from "../actions/orderActions";

import MOCK_ORDERS from "@/redux/order/mock/orders.mock.json";
import { USE_MOCK } from "@/config/env";
import { message } from "antd";

export const fetchOrders = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchOrdersRequest());

    try {
      let data;

      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300));
        data = MOCK_ORDERS;
      } else {
        const res = await fetch("http://localhost:8080/orders");

        if (!res.ok) {
          message.error("API mode enabled but server not responding.");
          dispatch(fetchOrdersSuccess([]));
          return;
        }

        data = await res.json();
      }

      dispatch(fetchOrdersSuccess(data));
    } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        dispatch(fetchOrdersFailure(errorMessage));
        dispatch(fetchOrdersSuccess([]));
        message.error(`API Error: ${errorMessage}`);
      }
  };
};
