import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
declare var $ : any;

@Component({
  selector: 'app-payment-super-admin',
  templateUrl: './payment-super-admin.component.html',
  styleUrls: ['./payment-super-admin.component.css']
})
export class PaymentSuperAdminComponent implements OnInit {
  pageNumber: number = 1
  pageLength: number = 10
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
   earnings: any;
   earned: Boolean = false;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter) { 
      this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

  ngOnInit(): void {
    
  }
  
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  getUnSettledEarnings() {

    
    var fromDate = (document.getElementById('fromDate') as HTMLInputElement).value
    var toDate = (document.getElementById('toDate') as HTMLInputElement).value
    console.log(fromDate, toDate);

    this.adminService.getFacilitatorsUnSettledEarnings(fromDate, toDate).subscribe(data => {
      console.log(data);
      if (data.statusMessage == "No Available Record") {
        this.earned = false
        this.toastr.info(data.statusMessage);
      }
      else {
        this.earned = true
        this.toastr.info(data.statusMessage);
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 10,
         lengthMenu : [10, 20, 25, 50],
      processing: true
    };
    this.dtTrigger.next();
    this.earnings = data.data;
  }
    },
    err => {
      console.log(err);
      this.toastr.error("An Error Occured");
      return false;
    });
  }

  viewEarnings(id) {
    console.log(id);
    this.router.navigate(['/view-earnings'], { queryParams: { id: id } });

  }

  payEarnings(id) {
    console.log(id)
  
    this.adminService.payFacilitator(id).subscribe(data => {
      console.log(data);
      if(data.statusMessage == "Course Approved and Verified Successfully"){
        this.toastr.success("Course Approved and Verified Successfully");
        // this.courses = this.courses.filter((ser) => {
        //           return ser.id !== id;
        //         });
      }
      else if (data.statusMessage == "No Course with the specified ID") {
        this.toastr.info(data.statusMessage);
      }
      else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
    });
  }

  
onLogoutClick(){
  $("#logoutModal").modal('hide')
  this.authService.logout();
  this.toastr.success('Logout Successfull');
  this.router.navigate(['/login-super-admin']);
  return false;
}

}
