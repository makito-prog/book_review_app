import { combineReducers } from 'redux';
import paginationReducer from './reducer';

const rootReducer = combineReducers({
  pagination: paginationReducer,
});

export default rootReducer;
