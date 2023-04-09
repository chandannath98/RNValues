/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    stateData: {},
  };

  export default function Customerlist(state = INITIAL_STATE, action) {
  // console.log('customerfilterData=====>', action);
    switch (action.type) {
          case 'GSTNO_LIST':
            return {
              ...state,
              GstnoListData:action.GstnoListData,
            };
            break;
            case 'CREATE_CUSTOMER_LIST':
              return {
                ...state,
                CreateCustomerListData:action.CreateCustomerListData,
              };
              break;
              case 'CREATE_CUSTOMER_POST_LIST':
                return {
                  ...state,
                  CreateCustomerPostListData:action.CreateCustomerPostListData,
                };
                break;
                case 'MY_CUSTOMER_LIST':
                  return {
                    ...state,
                    MyCustomerListData:action.MyCustomerListData,
                  };
                  break;
                  case 'FOLLOWUP_LIST':
                    return {
                      ...state,
                      FollowupListData:action.FollowupListData,
                    };
                    break;
                    case 'ESTIMATE_LIST':
                    return {
                      ...state,
                      estimateListData:action.estimateListData,
                    };
                    break;
                    case 'CUSTOMER_USER_LIST':
                      return {
                        ...state,
                        customerlistuserData:action.customerlistuserData,
                      };
                      break;
         
      default:
        return state;
    }
  }
  