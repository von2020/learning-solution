import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BreadcrumbService, Breadcrumb } from 'angular-crumbs';
declare var $: any;

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  constructor(
    private titleService: Title,
    private meta: Meta,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description',
      content:
        'Create and Sell Online Courses under your won Brand and see the First hand Impact teaching online with expertplat will have on your business.',
    });
    this.meta.updateTag({ name: 'author', content: 'Softworks Limited' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'e-learning, online courses, instructor, teacher',
    });

    this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
      this.titleService.setTitle(this.createTitle(crumbs));
    });

    $('.nav-switch').on('click', function (event) {
      $('.main-menu').slideToggle(400);
      event.preventDefault();
    });
  }

  private createTitle(routesCollection: Breadcrumb[]) {
    const title = 'Teachers';
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
}
