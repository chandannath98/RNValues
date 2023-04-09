/* eslint-disable prettier/prettier */
class Environment {
  constructor() {
    this.setEnvironment('dev');   //http://40.79.64.69:85/api
    //this.setEnvironment('sandbox');
    // this.setEnvironment('production');
  }

  setEnvironment(env) {
    this.environment = env;

    if (env === 'dev') {
      // Base URL
      this.baseURI = 'https://rnsvalves.com/api/';
      //this.baseURI = 'https://internationalelectrical-qa.chetu.com/api/v1';

      // API URLs on Registeration screen
      // this.registrationURL = '/registration';
      this.loginDataURL = 'crud/field-executives-auth';
      this.categoryDataURL = 'v1/catalogue-inventory/section';
      this.productDataURL = "v1/get-products-categorywise/category/"
      this.productDetailsDataURL = "v1/catalogue-inventory/product/"
      this.DealerListDataURL = "v1/customer-list/customers/"
      this.AttendanceListDataURL = "v1/sales/attendance"
      this.checkinListDataURL = "v1/sales/checkin"
      this.checkinupdateListDataURL="v1/sales/checkin"
      this.createorderDataURL="v1/customer/create"
      this.createcustomerDataURL="v1/customer"
      this.leavestatusDataURL="v1/sales/leaves/create"
      this.leaveCreateDataURL="v1/sales/leaves"
      this.leaveCountDataURL="v1/leaves/sales/id/"
      this.MyCustomerDataURL="v1/customer-list/customers/role/"
      this.FollowupDataURL="v1/follow-ups/sales/"
      this.EstimateDataURL="v1/sales/estimate/create"
      this.ProductdropdownDataURL="v1/catalogue-inventory/product/create"
      this.CreateorderDataURL="v1/sales/estimate"
      this.CreateordernewDataURL="v1/add-product/estimate/"
      this.estimateproductsDataURL="v1/estimate-products/estimate/"
      this.estimateproductsdeleteDataURL="v1/delete-estimate-products/estimate/"
      this.OrderListDataURL="v1/estimate/sales/id/"
      this.CheckInUserListDataURL="v1/check-ins/salesmen/id/"
      this.CreatecheckindropdownlistDataURL="v1/sales/checkin/create"
      this.checkoutlistDataURL="v1/sales/checkin/"
      this.expansedropdownlistDataURL="v1/sales/add-expanse/create"
      this.expansegetDataURL="v1/sales/add-expanse/id/"
      this.confirmestimatestatusDataURL  ="v1/confirm-estimate-status/estimate/"
      this.shareestimateaccountDataURL = "v1/share-estimate-account/estimate/"
      this.checkincustomerslist = "v1/check-ins-customers/salesmen/id/"
   

    }
  }
}

const Env = new Environment();

export default Env;
