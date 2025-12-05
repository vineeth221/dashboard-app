import type { RootState } from "@/redux/store";

export const selectOrders = (state: RootState) => state.order.data;
export const selectOrdersLoading = (state: RootState) => state.order.loading;
export const selectOrdersError = (state: RootState) => state.order.error;
