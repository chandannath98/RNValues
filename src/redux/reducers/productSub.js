/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    stateData: {},
  };

  export default function productSub(state = INITIAL_STATE, action) {
  // console.log('customerfilterData=====>', action);
    switch (action.type) {
          case 'PRODUCT_LIST':
            return {
              ...state,
              ProductData:action.ProductData,
            };
            break;
            case 'PRODUCT_DROPLIST':
              return {
                ...state,
                ProductdropData:action.ProductdropData,
              };
              break;
            case 'PRODUCT_DETAILS_LIST':
            return {
              ...state,
              ProductDetailsData:action.ProductDetailsData,
            };
            break;
            case 'PRODUCT_DETAILS_DROP_LIST':
              return {
                ...state,
                ProductDetailsData:action.ProductDetailsData,
              };
              break;
              case 'PRODUCT_DROPDOWN_LIST':
                return {
                  ...state,
                  productdropdownListData:action.productdropdownListData,
                };
                break;
                case 'CREATE_PRODUCT_SUCCESS':
                return {
                  ...state,
                  ProductcreateData:action.ProductcreateData,
                };
                break;
                case 'CREATE_NEW_PRODUCT_SUCCESS':
                return {
                  ...state,
                  ProductcreatenewData:action.ProductcreatenewData,
                };
                break;
                case 'ESTIMATE_LIST_ORDER':
                return {
                  ...state,
                  estimatelistorderData:action.estimatelistorderData,
                };
                break;
                case 'ORDER_LIST':
                return {
                  ...state,
                  OrderListData:action.OrderListData,
                };
                break;
                case 'ESTIMATE_STATUS_LIST':
                  return {
                    ...state,
                    estimatestatuslist:action.estimatestatuslist,
                  };
                  break;
                  case 'SHARE_ESTIMATE_ACCOUNT_LIST':
                    return {
                      ...state,
                      shareestimateaccountlist:action.shareestimateaccountlist,
                    };
                    break;
                    case 'FINAL_ORDER_LIST':
                      return {
                        ...state,
                        FinalorderlistData:action.FinalorderlistData,
                      };
                      break;
            
      default:
        return state;
    }
  }
  