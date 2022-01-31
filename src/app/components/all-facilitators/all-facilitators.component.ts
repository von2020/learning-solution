import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { SendDataService } from 'src/app/services/send-data.service';
declare var $ : any;

@Component({
  selector: 'app-all-facilitators',
  templateUrl: './all-facilitators.component.html',
  styleUrls: ['./all-facilitators.component.css']
})
export class AllFacilitatorsComponent implements OnInit {
  pageNumber: number = 1
  pageLength: number = 10
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
   facilitators: any;
  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private adminService: AdminService,
    private sendDataService : SendDataService, 
    private router: Router) { }

  ngOnInit(): void {

    this.getAllFacilitators()
    
  }

  getAllFacilitators() {
    this.adminService.getFacilitators().subscribe(data => {
      console.log(data);
      
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 10,
         lengthMenu : [10, 20, 25, 50],
      processing: true
    };
    this.dtTrigger.next()
    this.facilitators = data.data;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  openProfile (facilitatorId) {
    // this.sendDataService.setMessage(facilitator);
    // this.authService.storeEachFacilitatorData(facilitator);
    // this.router.navigate(['/facilitator-profile', facilitatorId]);
    this.router.navigate(['/profile-facilitators'], { queryParams: { id: facilitatorId } });
  }

  
onLogoutClick(){
  $("#logoutModal").modal('hide')
  this.authService.logout();
  this.toastr.success('Logout Successfull');
  this.router.navigate(['/login-super-admin']);
  return false;
}

}
