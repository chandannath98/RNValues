/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiRequest from '../../network/api';
import API from '../../network/env';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import toastModule from '../../utils/toastModule/tosatAlert';
// import { useSelector } from 'react-redux';
// import { LOGOUT } from '../../constants/string';
import axios from 'axios';

// ---------------- Set loader status -------------------------//
export function isDataLoading(isLoading) {
  return {
    type: 'LOADER_STATUS',
    isLoading,
  };
}



// ========== Handle Login API ===================//
export const handleLogin = loginData => async dispatch => {
  dispatch(isDataLoading(true));

  // console.log("loginData", loginData);
  const response = await apiRequest(API.loginDataURL, 'POST', loginData.data);
  dispatch(isDataLoading(false));

  if (response) {
 
   AsyncStorage.setItem('isEmailVerified', 'true');
    dispatch(loginSuccess(response));
  }
};



export function loginSuccess(loginData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'LOGIN_SUCCESS',
    loginData,
  };
}


// ========== Handle state Filter API ===================//
export const handleMainCategoryFilter = MainCategoryfilterData => async dispatch => {

  dispatch(isDataLoading(true));
  const response = await apiRequest(API.categoryDataURL, 'GET', MainCategoryfilterData);
  dispatch(isDataLoading(false));

  if (response) {
    dispatch(MainCategoryFilterSuccess(response));

  }
};

export function MainCategoryFilterSuccess(MainCategoryData) {
  return {
    type: 'MAINCATEGORY_LIST',
    MainCategoryData,
  };
}



// ========== Handle Product Filter API ===================//
export const handleProduct = ProductfilterData => async dispatch => {

  dispatch(isDataLoading(true));
  const response = await apiRequest(API.productDataURL + ProductfilterData.data.slug, 'GET');
  dispatch(isDataLoading(false));
  if (response) {
    ProductfilterData.navigation.navigate('Product', { dataurl: ProductfilterData.data.slug });
    dispatch(ProductFilterSuccess(response));

  }
};

export function ProductFilterSuccess(ProductData) {
  return {
    type: 'PRODUCT_LIST',
    ProductData,
  };
}


// ========== Handle Product Filter API ===================//
export const handleProductdrop = ProductfilterData => async dispatch => {
  // console.log('ProductfilterData.data.slug',API.productDataURL + ProductfilterData.data.slug);
  if (ProductfilterData.data.slug !== "Select Category") {
    dispatch(isDataLoading(true));
    const response = await apiRequest(API.productDataURL + ProductfilterData.data.slug, 'GET');
    dispatch(isDataLoading(false));
    if (response) {
      console.log(response);
      // ProductfilterData.navigation.navigate('Product', { dataurl: ProductfilterData.data.slug });
      dispatch(ProductdropFilterSuccess(response));

    }
  }

};

export function ProductdropFilterSuccess(ProductdropData) {
  return {
    type: 'PRODUCT_DROPLIST',
    ProductdropData,
  };
}





// ========== Handle Product Details Filter API ===================//
export const handleProductDetails = ProductdetailsfilterData => async dispatch => {

  // console.log('ProductdetailsfilterData===>', ProductdetailsfilterData.data);

  dispatch(isDataLoading(true));
  const response = await apiRequest(API.productDetailsDataURL + ProductdetailsfilterData.data.slug, 'GET');
  dispatch(isDataLoading(false));
  ///console.log('testing==>', ProductdetailsfilterData.navigation);
  if (response) {
    ProductdetailsfilterData.navigation.navigate('ProductDetails');
    dispatch(ProductDetailsFilterSuccess(response));

  }
};

export function ProductDetailsFilterSuccess(ProductDetailsData) {
  return {
    type: 'PRODUCT_DETAILS_LIST',
    ProductDetailsData,
  };
}


// ========== Handle Product Details Filter API ===================//
export const handleProductDetailsdrop = ProductdetailsfilterData => async dispatch => {
  if (ProductdetailsfilterData.data.slug !== "Select Product") {
    dispatch(isDataLoading(true));
    const response = await apiRequest(API.productDetailsDataURL + ProductdetailsfilterData.data.slug, 'GET');
    dispatch(isDataLoading(false));
    if (response) {
      // console.log('response==========>', response);
      dispatch(ProductDetailsdropFilterSuccess(response));
    }
  }
};

export function ProductDetailsdropFilterSuccess(ProductDetailsdropData) {
  return {
    type: 'PRODUCT_DETAILS_DROP_LIST',
    ProductDetailsdropData,
  };
}


// ========== Handle Product Details Filter API ===================//
export const handleDealerList = DealerListData => async dispatch => {

  dispatch(isDataLoading(true));
  if (DealerListData.data.customer == 3) {
    const response = await apiRequest(API.MyCustomerDataURL + DealerListData.data.role + '/id/' + DealerListData.data.ID, 'GET');
    dispatch(isDataLoading(false));
    if (response) {
      //  console.log('response======>',response);
      DealerListData.navigation.navigate('ChooseDealer');
      dispatch(DealerListFilterSuccess(response));

    }
  }
  else {
    const response = await apiRequest(API.DealerListDataURL + "type/" + DealerListData.data.type + "/id/" + DealerListData.data.ID, 'GET');
    dispatch(isDataLoading(false));
    if (response) {
      DealerListData.navigation.navigate('ChooseDealer');
      dispatch(DealerListFilterSuccess(response));

    }
  }



};

export function DealerListFilterSuccess(DealerListData) {
  return {
    type: 'DEALER_LIST',
    DealerListData,
  };
}


// ========== Handle Login API ===================//
export const handleattendance = attendanceData => async dispatch => {

  dispatch(isDataLoading(true));

  const response = await apiRequest(API.AttendanceListDataURL, 'POST', attendanceData.data);
  dispatch(isDataLoading(false));

  if (response) {
    // console.log(attendanceData.itemId);
  //  attendanceData.navigation.replace('OrderFollowList',{ ItemId: attendanceData.itemId });

  attendanceData.navigation.navigate('CreateCheckin');
    dispatch(AttendancSuccess(response));
  }
};



export function AttendancSuccess(AttandanceListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'ATTANDANCE_LIST',
    AttandanceListData,
  };
}

// ========== Handle Login API ===================//
export const handlecheckin = checkinData => async dispatch => {
  
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.checkinListDataURL, 'POST', checkinData.data);
  dispatch(isDataLoading(false));
 
  if (response) {
    checkinData.navigation.replace('OrderFollowtype', { ItemId: checkinData.ItemId, OrderType: response.data.ActionRemark });
    dispatch(checkinSuccess(response));
  }
};

// ========== Handle Login API ===================//
export const handlecheckinput = checkinData => async dispatch => {

  dispatch(isDataLoading(true));
  const response = await apiRequest(API.checkinListDataURL+"/"+checkinData.udid, 'PUT',checkinData.data);
  dispatch(isDataLoading(false));
 
  if (response) {
    if(checkinData.Usertypedata == 1){
      checkinData.navigation.replace('OrderFollowtype', { ItemId: checkinData.ItemId, OrderType: checkinData.data.action});
      dispatch(checkinSuccess(response));
    }
    else{
      checkinData.navigation.popToTop();
    }
  
   
  }
};



export function checkinSuccess(CheckinListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'CHECKIN_LIST',
    CheckinListData,
  };
}


// ========== Handle Login API ===================//
export const handlecheckinputout = checkinoutData => async dispatch => {
  console.log('====================================');
  console.log(checkinoutData);
  console.log('====================================');
    dispatch(isDataLoading(true));
    const response = await apiRequest(API.checkinListDataURL+"/"+checkinoutData.udid, 'PUT',checkinoutData.data);
    dispatch(isDataLoading(false));
   
    if (response) {
      checkinoutData.navigation.popToTop();
    //  console.log('checkinData',checkinData);
   //  checkinData.navigation.replace('OrderFollowtype', { ItemId: checkinData.ItemId, OrderType: checkinData.data.action});
     // dispatch(checkinSuccess(response));
    }
  };


// ========== Handle Login API ===================//
export const handlecheckinupdate = checkinupdateData => async dispatch => {

  dispatch(isDataLoading(true));

  const response = await apiRequest(API.checkinupdateListDataURL + "/" + checkinupdateData.data.uuid + "?meeting_time=30", 'PUT',);
  dispatch(isDataLoading(false));

  if (response) {
    checkinupdateData.navigation.navigate('CreateOrder', { ItemId: checkinupdateData.data.Customerid });
    dispatch(checkinupdateSuccess(response));
  }
};



export function checkinupdateSuccess(CheckinupdateListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'CHECKIN_UPDATE_LIST',
    CheckinupdateListData,
  };
}


// ========== Handle Product Details Filter API ===================//
export const handleGstno = GstnoListData => async dispatch => {
  dispatch(isDataLoading(true));
  let params = {
    method: 'get',
    url: `https://api.mastergst.com/public/search?email=` + GstnoListData.data.email + `&gstin=` + GstnoListData.data.gstin,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      client_id: 'GSPb9378804-ac12-4833-aa85-21d053626c5a',
      client_secret: 'GSP93893e8b-08b2-465c-a322-227bcb7a7486',
    },
  };
  const response = await axios(params);
  //console.log('==========>',response.data.error.message);
  dispatch(isDataLoading(false));
  if (response.data.status_cd == "1") {
    GstnoListData.navigation.navigate('CreateCustomerDetails');
    dispatch(GstnoListFilterSuccess(response.data));
  }
  else {
    toastModule.toastMessageBox(response.data.error.message);
  }
};

export function GstnoListFilterSuccess(GstnoListData) {
  return {
    type: 'GSTNO_LIST',
    GstnoListData,
  };
}


// ========== Handle Login API ===================//
export const handleCreateCustomer = CreateCustomerData => async dispatch => {

  dispatch(isDataLoading(true));
  console.log('response', API.createorderDataURL);
  const response = await apiRequest(API.createorderDataURL, 'GET');
  dispatch(isDataLoading(false));

  if (response) {
    console.log('response=======>', response);
    // checkinData.navigation.replace('OrderFollowtype',{ItemId:checkinData.ItemId});
    dispatch(CreateCustomerSuccess(response));
  }
};



export function CreateCustomerSuccess(CreateCustomerListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'CREATE_CUSTOMER_LIST',
    CreateCustomerListData,
  };
}





// ========== Handle Login API ===================//
export const handleCreateCustomerPost = CreateCustomerPostData => async dispatch => {
  console.log(CreateCustomerPostData);
  dispatch(isDataLoading(true));
  console.log(API.createcustomerDataURL);
  const response = await apiRequest(API.createcustomerDataURL, 'POST', CreateCustomerPostData.data);
  dispatch(isDataLoading(false));

  if (response) {
    if (response.status == 200) {
      alert("Success")
      dispatch(checkinSuccess(response));
    }
    else {
      if (response.message.name) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailSecond')
        console.log(response.message.name[0]);
      }
      else if (response.message.email) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailSecond')
        console.log(response.message.email[0]);
      }
      else if (response.message.customer_phone) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailSecond')
        console.log(response.message.customer_phone[0]);
      }
      else if (response.message.second_sales_coordinator_id) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailSecond')
        console.log(response.message.second_sales_coordinator_id[0]);
      }
      else if (response.message.channel_type) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailSecond')
        console.log(response.message.channel_type[0]);
      }
      else if (response.message.category_level) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailSecond')
        console.log(response.message.category_level[0]);
      }
      else if (response.message.customer_marka) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailThird')
        console.log(response.message.customer_marka[0]);
      }
      else if (response.message.customer_booking_destination) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailThird')
        console.log(response.message.customer_booking_destination[0]);
      }
      else if (response.message.gati_type) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailThird')
        console.log(response.message.gati_type[0]);
      }
      else if (response.message.distance_km) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailThird')
        console.log(response.message.distance_km[0]);
      }
      else if (response.message.booking_pincode) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailThird')
        console.log(response.message.booking_pincode[0]);
      }
      else if (response.message.gati_branch) {
        CreateCustomerPostData.navigation.navigate('CreateCustomerDetailThird')
        console.log(response.message.gati_branch[0]);
      }
      else {
        alert("hhhhh")
      }

    }


  }
};

export function CreateCustomerPostSuccess(CreateCustomerPostListData) {
  return {
    type: 'CREATE_CUSTOMER_POST_LIST',
    CreateCustomerPostListData,
  };
}


// ========== Handle Login API ===================//
export const handleLeaveStatus = LeaveStatusData => async dispatch => {

  dispatch(isDataLoading(true));
  const response = await apiRequest(API.leavestatusDataURL, 'GET');
  dispatch(isDataLoading(false));

  if (response) {
    console.log('response=======>',response);
    LeaveStatusData.navigation.navigate("Applyleave")
    dispatch(LeaveStatusSuccess(response));
  }
};

export function LeaveStatusSuccess(LeaveStatusListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'LEAVE_STATUS_LIST',
    LeaveStatusListData,
  };
}


// ========== Handle Login API ===================//
export const handleLeaveCreate = LeaveCreateData => async dispatch => {

  dispatch(isDataLoading(true));
  const response = await apiRequest(API.leaveCreateDataURL, 'POST', LeaveCreateData.data);
  dispatch(isDataLoading(false));

  if (response) {
    //console.log('response=======>',response);
    LeaveCreateData.navigation.navigate("LeaveScreen")
    // alert("hhhhh")
    dispatch(LeaveCreateSuccess(response));
  }
};

export function LeaveCreateSuccess(LeaveCreateListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'LEAVE_CREATE_LIST',
    LeaveCreateListData,
  };
}




// ========== Handle Login API ===================//
export const handleLeaveCount = LeaveCountData => async dispatch => {

  dispatch(isDataLoading(true));
  const response = await apiRequest(API.leaveCountDataURL + LeaveCountData.data.userid, 'GET');
  dispatch(isDataLoading(false));

  if (response) {
    //  console.log('response=======>',response);
    // LeaveStatusData.navigation.navigate("Applyleave")
    dispatch(LeaveCountSuccess(response));
  }
};

export function LeaveCountSuccess(LeaveCountListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'LEAVE_COUNT_LIST',
    LeaveCountListData,
  };
}


// ========== Handle Login API ===================//
export const handleMyCustomer = MyCustomerData => async dispatch => {
  // alert('hhhhh')
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.MyCustomerDataURL + MyCustomerData.data.role + '/id/' + MyCustomerData.data.userId, 'GET');
  dispatch(isDataLoading(false));

  if (response) {
    MyCustomerData.navigation.navigate("ChooseDealer")
    dispatch(MyCustomerSuccess(response));
  }
};

export function MyCustomerSuccess(MyCustomerListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'MY_CUSTOMER_LIST',
    MyCustomerListData,
  };
}



// ========== Handle Login API ===================//
export const handleFollowup = FollowupData => async dispatch => {

  dispatch(isDataLoading(true));
  const response = await apiRequest(API.FollowupDataURL + "id/" + FollowupData.data.itemid, 'GET');
  dispatch(isDataLoading(false));

  if (response) {
    FollowupData.props.navigation.navigate("DrawerTodayFollowups")
    dispatch(FollowupSuccess(response));
  }
};

export function FollowupSuccess(FollowupListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'FOLLOWUP_LIST',
    FollowupListData,
  };
}

// ========== Handle Login API ===================//
export const handleestimatelist = FollowupData => async dispatch => {

  dispatch(isDataLoading(true));
  const response = await apiRequest(API.EstimateDataURL, 'GET');
  dispatch(isDataLoading(false));

  if (response) {

    dispatch(EstimateSuccess(response));
  }
};

export function EstimateSuccess(estimateListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'ESTIMATE_LIST',
    estimateListData,
  };
}



// ========== Handle Login API ===================//
export const handleproductdropdown = FollowupData => async dispatch => {

  // dispatch(isDataLoading(true));
  const response = await apiRequest(API.ProductdropdownDataURL, 'GET');
  // dispatch(isDataLoading(false));
  if (response) {
    dispatch(productdropdownSuccess(response));
  }
};
export function productdropdownSuccess(productdropdownListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'PRODUCT_DROPDOWN_LIST',
    productdropdownListData,
  };
}


// ========== Handle Login API ===================//
export const handleproductcreateorder = createorderData => async dispatch => {
  dispatch(isDataLoading(true));
  console.log(createorderData);
  const response = await apiRequest(API.CreateorderDataURL, 'POST', createorderData.data);
  dispatch(isDataLoading(false));

  if (response) {
    console.log(response);
    createorderData.navigation.navigate("CreateOrderSub")
    dispatch(productcreateSuccess(response));
  }
};

export function productcreateSuccess(ProductcreateData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'CREATE_PRODUCT_SUCCESS',
    ProductcreateData,
  };
}




// ========== Handle Login API ===================//
export const handleproductcreateordernew = createordernewData => async dispatch => {
  dispatch(isDataLoading(true));
 console.log('====================================');
 console.log(createordernewData);
 console.log('====================================');
  const response = await apiRequest(API.CreateordernewDataURL + createordernewData.EstimateId, 'POST', createordernewData.data);
  dispatch(isDataLoading(false));
console.log('====================================');
console.log(response.data);
console.log('====================================');
  if (response) {
    dispatch(productcreatenewSuccess(response));
  }
};



// ========== Handle Login API ===================//
export const handleproductcreateorderdelete = createorderdeleteData => async dispatch => {
  dispatch(isDataLoading(true));

  const response = await apiRequest(API.estimateproductsdeleteDataURL +createorderdeleteData.data.estimateid+'/product/'+ createorderdeleteData.data.productid, 'GET');
  dispatch(isDataLoading(false));
  if (response) {
    dispatch(productcreatenewSuccess(response));
  }
};


export function productcreatenewSuccess(ProductcreatenewData) {
  return {
    type: 'CREATE_NEW_PRODUCT_SUCCESS',
    ProductcreatenewData,
  };
}


// ========== Handle Login API ===================//
export const handleestimateproduct = estimateproductsData => async dispatch => {
  // dispatch(isDataLoading(true));
  console.log(estimateproductsData);
  const response = await apiRequest(API.estimateproductsDataURL + estimateproductsData.data.EstimateId, 'GET');
  // dispatch(isDataLoading(false));

  if (response) {
    console.log(response);
    dispatch(estimatelistorderSuccess(response));
  }
};

export function estimatelistorderSuccess(estimatelistorderData) {
  return {
    type: 'ESTIMATE_LIST_ORDER',
    estimatelistorderData,
  };
}


// ========== Handle Login API ===================//
export const handleOrderlist = OrderlistData => async dispatch => {
  // dispatch(isDataLoading(true));

  const response = await apiRequest(API.OrderListDataURL+OrderlistData.LoginUserId, 'GET');
  // dispatch(isDataLoading(false));

  if (response) {
    dispatch(OrderListSuccess(response));
  }
};

export function OrderListSuccess(OrderListData) {
  return {
    type: 'ORDER_LIST',
    OrderListData,
  };
}


// ========== Handle Login API ===================//
export const handlecheckinlistuser = checkinlistData => async dispatch => {
  // dispatch(isDataLoading(true));

  const response = await apiRequest(API.CheckInUserListDataURL+checkinlistData.LoginUserId, 'GET');
  // dispatch(isDataLoading(false));

  if (response) {
    dispatch(checkinlistuserSuccess(response));
  }
};

export function checkinlistuserSuccess(checkinlistuserData) {
  return {
    type: 'CHECK_IN_USER_LIST',
    checkinlistuserData,
  };
}


// ========== Handle Login API ===================//
export const handlecustomerlist = customerlistData => async dispatch => {
  // dispatch(isDataLoading(true));

  const response = await apiRequest(API.checkincustomerslist+customerlistData.LoginUserId, 'GET');
  // dispatch(isDataLoading(false));

  if (response) {
    dispatch(customerlistSuccess(response));
  }
};

export function customerlistSuccess(customerlistuserData) {
  return {
    type: 'CUSTOMER_USER_LIST',
    customerlistuserData,
  };
}

// ========== Handle Login API ===================//
export const handlecreatecheckindropdownlist = createcheckindropdownlistData => async dispatch => {
  // dispatch(isDataLoading(true));

  const response = await apiRequest(API.CreatecheckindropdownlistDataURL, 'GET');
  // dispatch(isDataLoading(false));

  if (response) {
    dispatch(createcheckindropdownlistSuccess(response));
  }
};

export function createcheckindropdownlistSuccess(createcheckindropdownlist) {
  return {
    type: 'CREATE_CHECKIN_DROPDOWN_LIST',
    createcheckindropdownlist,
  };
}




// ========== Handle Login API ===================//
export const handlecheckout = checkoutData => async dispatch => {


  dispatch(isDataLoading(true));
  const response = await apiRequest(API.checkoutlistDataURL+checkoutData.udid, 'PUT',checkoutData.data);
  dispatch(isDataLoading(false));
 
  if (response) {
    if(checkoutData.data.action == "Order Recived"){
      await AsyncStorage.removeItem('Checkinstatus');
      await AsyncStorage.removeItem('udiddata');
      checkoutData.navigation.popToTop();
    }
    else{
      await AsyncStorage.removeItem('Checkinstatus');
      await AsyncStorage.removeItem('udiddata');
      checkoutData.navigation.popToTop();
    }
    // console.log('====================================');
    // console.log(response.data);
    // console.log('====================================');
    //  alert("successfull")
//   checkinData.navigation.replace('OrderFollowtype', { ItemId: checkinData.ItemId, OrderType: checkinData.data.action});
    dispatch(checkoutSuccess(response));
  }
};


// ========== Handle Login API ===================//
export const handlecreateexpansedropdown = expansedropdownlistData => async dispatch => {
  // dispatch(isDataLoading(true));

  const response = await apiRequest(API.expansedropdownlistDataURL, 'GET');
  // dispatch(isDataLoading(false));

  if (response) {
    dispatch(expansedropdownlistSuccess(response));
  }
};

export function expansedropdownlistSuccess(expansedropdownlist) {
  return {
    type: 'EXPANSE_DROPDOWN_LIST',
    expansedropdownlist,
  };
}


// ========== Handle Login API ===================//
export const handlecreateexpanseget = expansegetlistData => async dispatch => {
  // dispatch(isDataLoading(true));

  const response = await apiRequest(API.expansegetDataURL + expansegetlistData.LoginUserId, 'GET');
  // dispatch(isDataLoading(false));

  if (response) {
    dispatch(expansegetlistSuccess(response));
  }
};

export function expansegetlistSuccess(expansegetlist) {
  return {
    type: 'EXPANSE_GET_LIST',
    expansegetlist,
  };
}

// ========== Handle Login API ===================//
export const handleestimatestatus = estimatestatuslistData => async dispatch => {
  dispatch(isDataLoading(true));

  const response = await apiRequest(API.confirmestimatestatusDataURL + estimatestatuslistData.confirmestimate, 'GET');
  dispatch(isDataLoading(false));

  if (response) {
    dispatch(estimatestatuslistSuccess(response));
    estimatestatuslistData.navigation.navigate('Createorderestimate')
  }
};

export function estimatestatuslistSuccess(estimatestatuslist) {
  return {
    type: 'ESTIMATE_STATUS_LIST',
    estimatestatuslist,
  };
}

// ========== Handle Login API ===================//
export const handleshareestimateaccount = shareestimateaccountlistData => async dispatch => {
  dispatch(isDataLoading(true));

  const response = await apiRequest(API.shareestimateaccountDataURL + shareestimateaccountlistData.confirmestimate, 'GET');
  dispatch(isDataLoading(false));

  if (response) {
    dispatch(shareestimateaccountlistSuccess(response));
    shareestimateaccountlistData.navigation.navigate('FinalOrder')
  }
};

export function shareestimateaccountlistSuccess(shareestimateaccountlist) {
  return {
    type: 'SHARE_ESTIMATE_ACCOUNT_LIST',
    shareestimateaccountlist,
  };
}



export function checkoutSuccess(CheckoutListData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'CHECKOUT_LIST',
    CheckoutListData,
  };
}



// ========== Handle Login API ===================//
export const handleFinalorder = FinalorderData => async dispatch => {
  dispatch(isDataLoading(true));
  const response = await apiRequest(API.shareestimateaccountDataURL + FinalorderData.estimateId, 'POST', FinalorderData.data);
  dispatch(isDataLoading(false));

  if (response) {
    console.log('====================================');
    console.log(response);
    console.log('====================================');
    FinalorderData.navigation.popToTop()
    dispatch(FinalorderSuccess(response));
  }
};

export function FinalorderSuccess(FinalorderlistData) {
  // console.log("loginData===>>>", loginData)
  return {
    type: 'FINAL_ORDER_LIST',
    FinalorderlistData,
  };
}



// ------------------ Logout function  ------------------------------ //
export const handleLogout = loginData => async dispatch => {
  dispatch(isDataLoading(true));
  dispatch(isDataLoading(false));
  dispatch(loginSuccess(loginData));
};
