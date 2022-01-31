import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  RouterOutlet,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'expertplat';

  constructor(
    private titleService: Title,
    private meta: Meta,
    private breadcrumbService: BreadcrumbService,
    private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description',
      content:
        'ExpertPlat is an E-Learning Platform or course management system (CMS) - an Open-Source software package designed to help educators create effective online courses and earn money based on a cost approved by the super administrator.',
    });
    this.meta.updateTag({ name: 'author', content: 'Softworks Limited' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'e-learning, online courses',
    });

    this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
      this.titleService.setTitle(this.createTitle(crumbs));
    });

    const token =
      localStorage.getItem('id_token') || localStorage.getItem('id_Ftoken');

    //   if (this.authService.tokenExpired(token)) {
    //   // token expired
    //   this.router.navigate(['/login']);
    // } else {
    //   // token valid
    // }

    // if (this.jwtHelper.isTokenExpired(token)) {
    //   // token expired
    //   this.authService.logout();
    //   this.router.navigate(['/home']);
    //   // this._flashMessagesService.show('Session Timeout Please Log back in to Continue', { cssClass: 'alert-danger', timeout: 3000 });
    // } else {
    //   // token valid
    // }
  }

  private createTitle(routesCollection: Breadcrumb[]) {
    const title = 'expertplat';
    const titles = routesCollection.filter((route) => route.displayName);

    if (!titles.length) {
      return title;
    }

    const routeTitle = this.titlesToString(titles);
    return `${routeTitle} ${title}`;
  }

  private titlesToString(titles) {
    return titles.reduce((prev, curr) => {
      return `${curr.displayName} - ${prev}`;
    }, '');
  }

  // getAnimationData(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }
}
