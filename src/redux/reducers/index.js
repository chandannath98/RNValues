/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import loader from './loaderReducer';
import auth from './authReducer';
import maincategory from './maincategory';
import productSub from './productSub';
import dealerlist from './dealerlistReducer';
import Customerlist from './customerReducer';
import leavemanage from './leaveReducer';
import CheckInList from './CheckinlistReducer';


const rootReducer = combineReducers({
  loader,
  auth,
  maincategory,
  productSub,
  dealerlist,
  Customerlist,
  leavemanage,
  CheckInList,
});

export default rootReducer;
