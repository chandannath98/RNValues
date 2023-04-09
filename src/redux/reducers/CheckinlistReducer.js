/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    stateData: {},
  };

  export default function CheckInList(state = INITIAL_STATE, action) {
  // console.log('customerfilterData=====>', action);
    switch (action.type) {
          case 'CHECK_IN_USER_LIST':
            return {
              ...state,
              checkinlistuserData:action.checkinlistuserData,
            };
            break; 
            case 'CREATE_CHECKIN_DROPDOWN_LIST':
              return {
                ...state,
                createcheckindropdownlist:action.createcheckindropdownlist,
              };
              break; 
              case 'CHECKOUT_LIST':
              return {
                ...state,
                CheckoutListData:action.CheckoutListData,
              };
              break;  
              case 'EXPANSE_DROPDOWN_LIST':
              return {
                ...state,
                expansedropdownlist:action.expansedropdownlist,
              };
              break; 
              case 'EXPANSE_GET_LIST':
                return {
                  ...state,
                  expansegetlist:action.expansegetlist,
                };
                break;  
      default:
        return state;
    }
  }
  