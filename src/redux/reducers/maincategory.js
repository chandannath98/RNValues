/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    stateData: {},
  };

  export default function maincategory(state = INITIAL_STATE, action) {
  // console.log('customerfilterData=====>', action);
    switch (action.type) {
          case 'MAINCATEGORY_LIST':
            return {
              ...state,
              MainCategoryData:action.MainCategoryData,
            };
            break;
            
      default:
        return state;
    }
  }
  