import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PaystackOptions } from 'angular4-paystack';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  Name: String;
  CardNumber: String;
  ExpiryMonth: String;
  ExpiryYear: String;
  Cvv: String;
  Country: String;
  Zip: String;

  title: any;

  key: any;
  reference: any;

  paymentForm: FormGroup;

  email : any

  // options: PaystackOptions = {
  //   amount: 50000,
  //   email: 'user@mail.com',
  //   ref: `${Math.ceil(Math.random() * 10e10)}`
  // }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.key = this.authService.getKey;
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;

    this.paymentForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      CardNumber: new FormControl('', Validators.required),
      ExpiryMonth: new FormControl('', Validators.required),
      ExpiryYear: new FormControl('', Validators.required),
      Cvv: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      Zip: new FormControl(null, Validators.required)
    });

  }

  payNow() {
    let serializedForm = JSON.stringify(this.paymentForm.value);
    console.log(serializedForm);
  }

}
