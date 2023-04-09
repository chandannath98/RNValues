/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    stateData: {},
  };

  export default function leavemanage(state = INITIAL_STATE, action) {
  // console.log('customerfilterData=====>', action);
    switch (action.type) {
          case 'LEAVE_STATUS_LIST':
            return {
              ...state,
              LeaveStatusListData:action.LeaveStatusListData,
            };
            break;
            case 'LEAVE_CREATE_LIST':
            return {
              ...state,
              LeaveCreateListData:action.LeaveCreateListData,
            };
            break;
            case 'LEAVE_COUNT_LIST':
              return {
                ...state,
                LeaveCountListData:action.LeaveCountListData,
              };
              break;
         
            
      default:
        return state;
    }
  }
  