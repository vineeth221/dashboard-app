import { combineReducers } from "redux";
import orderReducer from "@/redux/order/reducers/orderReducer";

const rootReducer = combineReducers({
  order: orderReducer,
});

export default rootReducer;
