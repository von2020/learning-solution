import { Component, OnInit } from '@angular/core';
declare var dataLayer : any

@Component({
  selector: 'app-super-admin-footer',
  templateUrl: './super-admin-footer.component.html',
  styleUrls: ['./super-admin-footer.component.css']
})
export class SuperAdminFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  //   window.dataLayer = window.dataLayer || [];

  // function gtag() {
  //   dataLayer.push(arguments);
  // }
  // gtag('js', new Date());

  // gtag('config', 'UA-23581568-13');
  }

}
