import { combineReducers } from 'redux';
import orderRecordsReducer from './Order';
import userInfoReducer from './User';
// 合併多個 reducer
const RootReducer = combineReducers(
  {
    orderRecordsReducer,
    userInfoReducer,
  },
);

export default RootReducer;
