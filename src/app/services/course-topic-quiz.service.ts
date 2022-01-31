import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {Iquiz, Iquestion, IbulkQuestions} from '../shared/Model';

@Injectable({
  providedIn: 'root'
})
export class CourseTopicQuizService {
  url: string;
  FacilitatorToken: string;

  constructor(private http: HttpClient, private jwt: JwtHelperService) { 
    this.url = 'https://expertplat.com:44392';
    this.FacilitatorToken = localStorage.getItem('id_Ftoken');
  }


getCourseTopicQuizByFacilitator(id: number): Observable<any> {
  return this.http.get(this.url + '/api/v1/CourseTopicQuiz/courseTopicQuizByFacilitatorId?facilitatorId=' + id,

    {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Authorization: this.FacilitatorToken
      })
    }
  );
}

getCourseTopicQuizByCourseId(id: number): Observable<any> {
  return this.http.get(this.url + '/api/v1/CourseTopicQuiz/courseTopicQuizByCourseId?courseId=' + id,

    {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Authorization: this.FacilitatorToken
      })
    }
  );
}

}
