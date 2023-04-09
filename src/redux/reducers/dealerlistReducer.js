/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    stateData: {},
  };

  export default function dealerlist(state = INITIAL_STATE, action) {
  // console.log('customerfilterData=====>', action);
    switch (action.type) {
          case 'DEALER_LIST':
            return {
              ...state,
              DealerListData:action.DealerListData,
            };
            break;
            case 'ATTANDANCE_LIST':
            return {
              ...state,
              AttandanceListData:action.AttandanceListData,
            };
            break;
            case 'CHECKIN_LIST':
              return {
                ...state,
                CheckinListData:action.CheckinListData,
              };
              break;
              case 'CHECKIN_UPDATE_LIST':
                return {
                  ...state,
                  CheckinupdateListData:action.CheckinupdateListData,
                };
                break;
            
      default:
        return state;
    }
  }
  