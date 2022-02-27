import { combineReducers } from 'redux';
import orderRecordsReducer from './Order';
// 合併多個 reducer
const RootReducer = combineReducers(
  {
    orderRecordsReducer,
  },
);

export default RootReducer;
