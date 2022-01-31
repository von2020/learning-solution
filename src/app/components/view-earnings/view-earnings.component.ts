import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { IPayFacilitator } from 'src/app/shared/Model';
declare var $ : any;

@Component({
  selector: 'app-view-earnings',
  templateUrl: './view-earnings.component.html',
  styleUrls: ['./view-earnings.component.css']
})
export class ViewEarningsComponent implements OnInit {
  id: string;
  private sub: any;
  pageNumber: number = 1
  pageLength: number = 10
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
  courses: any;
  earnings: any;
  payedEarning: Array<IPayFacilitator>;
  demoChk= [];
  checked : boolean;

  constructor(private route: ActivatedRoute,
    private toastr: ToastrService,
    private authService: AuthService,
    private adminService: AdminService,
    private facilitatorService: FacilitatorService,
    private router: Router) {
      // this.payedEarning = {};
     }

  ngOnInit(): void {

    this.sub = this.route.queryParams.subscribe(params => {
      this.id = params.id
    
      console.log(this.id)
      this.facilitatorService.getEarningsPerCourse(this.id).subscribe(data => {
        console.log(data);
        if(data.statusCode == 200){
          this.dtOptions = {
            // pagingType: 'full_numbers',
            pageLength: 10,
               lengthMenu : [10, 20, 25, 50],
            processing: true
          };
          this.dtTrigger.next()
        this.earnings = data.data;
        }
       //  this.sendDataService.setMessage(category.data);
      },
      err => {
        console.log(err);
        return false;
      });
 
     });

    
  }

  updateChecked2(value,event){
    if(event.target.checked){
      this.demoChk.push(
        {TotalEarningsId : value});
    }
    else if (!event.target.checked){
      let indexx = this.demoChk.indexOf(value);
      this.demoChk.splice(indexx,1);
    }
    console.log(this.demoChk)
  }

  payEarnings() {
    this.payedEarning = this.demoChk
    
    console.log(this.payedEarning)

    this.adminService.payFacilitator(this.payedEarning).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200){
        if (data.data[0].statusCode == 409) {
          this.toastr.info(data.data[0].statusMessage);
        }
        else {
          this.toastr.success(data.data[0].statusMessage);
          this.earnings = this.earnings.filter((ser) => {
            return ser.id !== data.data[0].data.id;
          });
        }

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
