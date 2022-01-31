import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isExternal: boolean = false;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const facilitator = this.authService.getFUser().facilitatorTypeId;

    if (facilitator == 1) {
      this.isExternal = true
    }
    else if (facilitator == 2) {
      this.isExternal = false
    }
  }

}
