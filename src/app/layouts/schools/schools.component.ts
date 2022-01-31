import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css'],
})
export class SchoolsComponent implements OnInit {
  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description',
      content:
        'a school management solution that offers real time access to attendance records, homeworks, scheduled exams and extra lessons',
    });
    this.meta.updateTag({ name: 'author', content: 'Softworks Limited' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'e-learning, school management, examination, attendance',
    });
  }
}
