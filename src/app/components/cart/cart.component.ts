import { HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { LearnerService } from 'src/app/services/learner.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { ValidateService } from 'src/app/services/validate.service';
declare var $:any;
declare var PaystackPop: any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  id: any;
  private sub: any;

  Email: String;
  Password: String;
  loginForm: FormGroup;
  firstname : any;
  facilitator : boolean;
  showModal: boolean;
  Code: String;

  // response: {};

  // email : any

  key: any;
  reference: any;
  amount: number;
  user: any;
  error: any;
  success: string;
  paymentForm: any;
  LearnerId: any;
  email: any;
  cartItems: any;
  courseId: any;
  facilitatorDetail: any;
  totalAmount: any=0;
  subTotal: any;
  loading: boolean;
  paytypetxt: any;
  paykey: string;
  couponCode: string;
  emptyCart: any;
  percentage: any;
  cartItemId: any;
  disabled: boolean = false;

  constructor(private authService: AuthService,
    private learnerService: LearnerService,
    private courseService: CourseService,
    private validateService: ValidateService,
    private router: Router,
    private toastr: ToastrService,
    private sendDataService : SendDataService,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private zone: NgZone) { }

  ngOnInit(): void {

    
    $('#confirmModal').modal('hide')

    this.loginForm = new FormGroup({
      Password: new FormControl('', Validators.required),
      Email: new FormControl('', [
        Validators.required,
        Validators.email,
      ])});

    const learnerId = JSON.parse(this.authService.getId());
    this.LearnerId = learnerId


    // const courseObject = this.sendDataService.getMessage();
    // this.email = courseObject.email
    // console.log(courseObject);

    console.log(this.LearnerId);

    this.key = this.authService.getKey;
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.totalAmount = 0;
    // this.email = "steevyn51@gmail.com"
  //   this.sub = this.route.params.subscribe(params => {
  //     this.id = +params['cartId']; // (+) converts string 'id' to a number

  //     // In a real app: dispatch action to load the details here.
  //  });
  if (this.authService.getCartId() == null) {
      this.emptyCart = "Your cart is empty. Keep shopping to find a course!"
  }

  else {
  this.id = this.authService.getCartId();
   console.log(this.id)
   this.courseService.getCartItemsById(this.id).subscribe(data => {
    console.log(data);
    this.cartItems = data.cartItems;
    if(data.statusCode == 200) {
      this.getCartSubTotalCheckout();
    }
  },
  err => {
    console.log(err);
    return false;
  });
}


  //  this.authService.getCoursesById(this.courseId).subscribe(data => {
  //   console.log(data);
  //   this.facilitatorDetail = data[0].facilitatorFirstName;
  // },
  // err => {
  //   console.log(err);
  //   return false;
  // });

  }

  goHome() {
    if(this.authService.authToken == null || this.authService.authToken == undefined) {
        this.router.navigate(['/home'])
    } else {
        this.router.navigate(['/home-learner'])
  }
    
  }

  paymentDone(event: any) {
    if (event.status == "success") {
      // let payment = {
        const cartId =  this.id;
        const learnerId =  this.LearnerId;
        const reference = event.trxref
      // };
      this.learnerService.completePayment(cartId,learnerId,reference).subscribe(
        (item) => {
          this.error = null;
          this.success = "Payment Successful";
        },
        (error) => {
          this.success = null;
          this.error = "An Error Occured. Kindly Contact Us";
        }
      );
    }
  }

  balancePayment() {
    if(this.learnerService.loggedIn()) {
      const learnerId = JSON.parse(this.authService.getId());
      this.LearnerId = learnerId
      console.log(this.LearnerId)
      this.email = this.authService.getEmail();
        
    if(this.totalAmount == 0) {
      setTimeout( ()=>{
        this.courseEnroll();
      }, 2000);
  
    }
    else {
      this.pay();
    }
      
    }
    else {
      $('#myModal').modal('show');
    }
}

pay() {
  this.paytypetxt = $("#ddlServiceName option:selected").text();
    this.paykey = this.authService.getKey;
    this.amount = this.totalAmount * 100;
    var handler = PaystackPop.setup({
        key: this.paykey,
        email: this.email,
        amount: this.amount,
        currency: "NGN",
        ref: this.reference,
        
        metadata: {
            custom_fields: [
                {
                    //display_name: "Mobile Number",
                    //variable_name: "mobile_number",
                    //value: "+2348012345678"
                }
            ]
        },
        callback: (response)=>{ 
          console.log(response);
          const cartId =  this.id;
    const learnerId =  this.LearnerId;
    const reference = response.reference;
    console.log(cartId);
    console.log(learnerId);
    console.log(reference);

    

    if(response.status == "success") {
          this.learnerService.completePayment(cartId,learnerId,reference).subscribe(
            (item) => {
              console.log(item);
              if(item.statusCode == 200){
                console.log(item);
                this.courseEnroll();
              }
              this.error = null;
              this.success = "Payment Successful";
            },
            (error) => {
              this.success = null;
              this.error = "An Error Occured. Kindly Contact Us";
            }
          );
        }
      }
        ,
        onClose: function () {
            alert('window closed');
        }
    });
    handler.openIframe();
}


courseEnroll() {

  console.log(this.LearnerId);
  const cart ={
    LearnerId : this.LearnerId,
    CartId : Number(this.id)
  }

  console.log(cart);

  let serializedForm = JSON.stringify(cart);
    console.log(serializedForm);

  this.learnerService.courseEnroll(serializedForm).subscribe(data => {
    console.log(data);
    if(data.statusCode == 200){
      this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
      this.authService.removeCart();
      $("#cartBadgevisibility").hide();
      this.zone.run(() => {
        this.router.navigate(['/courses-learner'])
    });
    }else {
      this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
      // this.router.navigate(['confirmation'])
      console.log(data.statusMessage)
    }
  },
  err => {
    console.log(err);
    return false;
  });
}

applyCouponCode() {

  this.courseService.applyCouponCode(this.couponCode).subscribe(data => {
    console.log(data);
    if(data.statusCode == 200){
      if(data.statusMessage == "Successful, No Record Available") {
        this.toastr.info('Coupon does not exist');
        this._flashMessagesService.show('Coupon does not exist', {cssClass: 'alert-success', closeOnClick: true,});
      }
      else {
      this.percentage = (100-(data.data.couponPercentage));
      var percentageOff = data.data.couponPercentage;
      console.log(data.data.couponPercentage);
      this.totalAmount = ((percentageOff/100)*this.totalAmount).toFixed(3);
      // this.totalAmount = this.percentage(percentageOff, this.totalAmount);
      console.log(this.totalAmount);
      this.toastr.success(data.statusMessage);
      this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
      }
    }else {
      this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
        timeOut: 3000,
      });
      this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
      console.log(data.statusMessage)
    }
  },
  err => {
    console.log(err);
    return false;
  });
}


// applyCouponCode() {

//   if(this.authService.loggedIn()) {
//     const learnerId = JSON.parse(this.authService.getId());
//     this.LearnerId = learnerId

//   const coupon = {
//     CouponCode : this.couponCode,
//     CartId: Number(this.id),
//     LearnerId : this.LearnerId
//   }

//   console.log(coupon);

//   let serializedForm = JSON.stringify(coupon);
//     console.log(serializedForm);

//   this.authService.applyCoupon(serializedForm).subscribe(data => {
//     console.log(data);
//     if(data.statusCode == 200){
//       alert(data.statusMessage);

//     }else {
//       this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
      
//       console.log(data.statusMessage)
//       alert(data.statusMessage);
//     }
//   },
//   err => {
//     console.log(err);
//     return false;
//   });
// }
// else {
//   $('#myModal').modal('show');
// }

// }

onLoginSubmit(){

  const value = this.loginForm.value;
  // let formObj = value.getRawValue();
  let serializedForm = JSON.stringify(value);
  console.log(serializedForm);
  // const user = {
  //   email: this.Email,
  //   password: this.Password
  // }

  //Required Fields
if (!this.validateService.validateRegister(this.loginForm.value)) {
  // 1st parameter is a flash message text
        // 2nd parameter is optional. You can pass object with options.
        this._flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
        console.log('Please fill in all fields');
  // this.ngFlashMessageService.showFlashMessage('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
  return false;
}

// Validate Email
else if (!this.validateService.validateEmail(this.loginForm.value.Email)) {
    // 1st parameter is a flash message text
        // 2nd parameter is optional. You can pass object with options.
        this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
    
  console.log('Please use a valid email');
  return false;
}

else {

  this.authService.loginLearner(serializedForm).subscribe(data => {
    console.log(data);
    if(data.statusCode == 200){
      let userFirstname = data.data.firstName;
      this.sendDataService.setMessage(userFirstname.toString())
      console.log(userFirstname.toString());
      this.authService.storeUserData("Bearer "+data.token, data.data, data.data.userId);
      this._flashMessagesService.show('You can now continue', {cssClass: 'alert-success', closeOnClick: true,});
      $('#myModal').modal('hide');
      this.router.navigate(['/cart'])
    }else if (data.statusMessage == "This Account Exist but has not been Activated!") {
      let userEmail = this.loginForm.value.Email;
      this.sendDataService.setMessage(userEmail)
      this.email = userEmail
      this.resendLearnerCode()
      console.log(this.email)
      // this.router.navigate(['/confirmation'])
      $('#myModal').modal('hide');
      $('#confirmModal').modal('show')
    }
    else {
      this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
      // this.router.navigate(['/login'])
    }
  });
}

}

resendLearnerCode() {
  this.learnerService.resendLearnerActivationCode(this.email).subscribe(data => {
    console.log(data);
    if(data.statusCode == 200){
      this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
      
      // this.router.navigate(['login'])
    }else {
      this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
      // this.router.navigate(['confirmation'])
    }
  },
  err => {
    console.log(err);
    return false;
  });
}
  

  paymentInit() {
    console.log('Payment initialized');
  }

  // paymentDone(ref: any) {
  //   this.title = 'Payment successfull';
  //   console.log(this.title, ref);
  // }

  paymentCancel() {
    console.log('payment failed');
  }

  deleteCartItem(id) {
    this.cartItemId = id;
  }
   
  confirmDeleteCartItem() {
    this.loading = true;
    this.learnerService.deleteCartItems(this.cartItemId, this.id).subscribe(data => {
      this.loading = false;
        if(data.statusCode == 200){
          this.cartItems = this.cartItems.filter((ser) => {
            return ser.id !== this.cartItemId
          });
          
          console.log(this.cartItems);
          
          if (this.cartItems.length === 0) {
            this.emptyCart = "Your cart is empty. Keep shopping to find a course!"
            this.disabled = true
            }
          this.authService.removeCart();
          $("#cartBadgevisibility").hide();
          this.getCartSubTotalCheckout();
          this.toastr.info('item removed from cart');
          this._flashMessagesService.show("item removed from Cart", {cssClass: 'alert-success', closeOnClick: true,});
        }else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
        }
      },
      err => {
        this.loading = false;
        console.log(err);
        return false;
      });
}

getCartSubTotalCheckout(){
this.courseService.getCartSubTotalCheckOut(this.id).subscribe(data => {
  console.log(data);
  this.subTotal = data.data.subTotal;
  this.totalAmount = data.data.totalAmountPayable;
},
err => {
  console.log(err);
  return false;
});
}

onActivateSubmit() {
  const user = {
    email: this.email,
    Code: this.Code
  }

  this.learnerService.activateAccount(user).subscribe(data => {
    console.log(data)
    if(data.statusCode == 200){
      this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
      console.log(data)
      // this.router.navigate(['login'])
      $('#confirmModal').modal('hide')
      $('#myModal').modal('show');
    }else {
      this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
      // this.router.navigate(['confirmation'])
    }
  });
}

}
