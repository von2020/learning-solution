import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LearnerService } from 'src/app/services/learner.service';
import { ILAccount } from 'src/app/shared/Model';
declare var $ : any;

@Component({
  selector: 'app-payment-learner',
  templateUrl: './payment-learner.component.html',
  styleUrls: ['./payment-learner.component.css']
})
export class PaymentLearnerComponent implements OnInit {
  LearnerId: any;
  account: ILAccount;
  loading: boolean = false;
  accounts : any = []
  accountId : number
  banks: any;
  bankCode: any;
  detail: any;
  accountDetail: any;
  resolvedData: boolean = false;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private learnerService: LearnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.LearnerId = JSON.parse(this.authService.getId());

    this.account = {};
    this.account.LearnerId = this.LearnerId;
    
    this.getAccountDetails();
    this.getBanks();
  }

  onCreateSubmit() {

    console.log(JSON.stringify(this.account))
      this.learnerService.createLearnerAccountDetail(JSON.stringify(this.account)).subscribe(data => {
        console.log(data);
        if(data.statusCode == 200){
  
          this.toastr.success(data.statusMessage);
          location.reload();

        }
        else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
        }
      });
  
  
  }

  getBanks() {
    this.authService.getBanks().subscribe((data) => {
        console.log(data);
        if (data.status = true) {
          console.log(data.data);
          this.banks = data.data;
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  selectValueChanged (event: any) {
    //update the ui
    this.bankCode = event.target.value;
    this.account.BankCode = this.bankCode;
    var value = $("#selectBankName option:selected");
    this.account.BankName = value.text();
    console.log(event);
    console.log(value.text());
    this.resolvedData = false
  }

  resolveAccountNumber() {
    console.log(this.account.AccountNumber)
    this.authService.resolveAccountNumber(this.account.AccountNumber, this.account.BankCode).subscribe((data: any) => {
      console.log(data);
      if(data.status = true) {
        this.resolvedData = true
    this.accountDetail = data.data;
    this.account.AccountName = this.accountDetail.account_name 
      }
      else {
        this.resolvedData = false
      }
    },
    err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Something Went Wrong!', {
        timeOut: 3000,
      });
      return false;
    });
  }

  getAccountDetails() {
    this.showLoadingSpinner();
    this.learnerService.getAccountDetailsByLearnerId(this.LearnerId).subscribe((detail) => {
        console.log(detail);
        if (detail.statusCode == 200) {
          console.log(detail.data);

          this.accounts = detail.data;
          this.hideLoadingSpinner();
        }
      },
      (err) => {
        this.hideLoadingSpinner();
        console.log(err);
        return false;
      }
    );
  }


  removeAccount(id) {
    this.accountId = id;
    $('#deleteModal').modal('show');
  }
  
  confirmDeleteAccount() {
    this.loading = true;
    this.learnerService.deleteLearnerAccountDetails(this.accountId).subscribe(data => {
      this.loading = false;
      console.log(data);
        if(data.statusCode == 200){
          this.accounts = this.accounts.filter((ser) => {
            return ser.id !== this.accountId
          });
          console.log(this.accounts);
          this.toastr.info('Account removed');
          $('#deleteModal').modal('hide');
        } 
        else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          $('#deleteModal').modal('hide');
        }
      },
      err => {
        this.loading = false;
        console.log(err);
        return false;
      });
  }

  editAccount (accountDetail) {
    this.account.LearnerId = this.LearnerId;
    this.account.BankName = accountDetail.bankName;
    this.account.BankCode = accountDetail.bankCode;
    this.account.AccountName = accountDetail.accountName;
    this.account.AccountNumber = accountDetail.accountNumber;
    this.accountId = accountDetail.id;
    $('#editSectionModal').modal('show');
    console.log(accountDetail)

  }

  onUpdateSubmit () {
      console.log(JSON.stringify(this.account))
      this.learnerService.updateLearnerAccountDetails((JSON.stringify(this.account)), this.accountId).subscribe(data => {
        console.log(data);
        if(data.statusCode == 200){
  
          this.toastr.success(data.statusMessage);
          location.reload();

        }
        else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
        }
      });
  }

  showLoadingSpinner() {
    this.loading = true;
  }

  hideLoadingSpinner() {
    this.loading = false;
  }

  openBankDetails() {
    $('.payment-section').css("height", "100%");
    $('.add-payment').hide();
    $('.bank-details').show();
  }

  cancelCreation() {
    location.reload();
  }

  
  onLogoutClick(){
    $("#logoutModal").modal('hide')
    this.authService.logout();
    this.toastr.success('You are logged out');
    this.router.navigate(['/home']);
    return false;
  }

}
