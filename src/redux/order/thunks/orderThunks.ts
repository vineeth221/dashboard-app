import type { AppDispatch } from "@/redux/store";
import {
  fetchOrdersFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  clearOrders,
} from "../actions/orderActions";
import { message } from "antd";
import { USE_MOCK } from "@/config/env";

let isFetching = false;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const fetchOrders = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchOrdersRequest());
    if (isFetching) return;

    isFetching = true;
    dispatch(clearOrders());

    try {
      let data = [];

      if (USE_MOCK) {
        const res = await fetch("/mock/orders.json");
        data = await res.json();
      } else {
        const res = await fetch("http://localhost:8080/orders");
        if (!res.ok) throw new Error("API server not responding");
        data = await res.json();
      }

      await delay(300);

      dispatch(fetchOrdersSuccess(data));

    } catch (error: any) {
      dispatch(fetchOrdersFailure(error?.message || "Unknown error"));
      message.error("API Error: " + error?.message);
    } finally {
      isFetching = false;
    }
  };
};
