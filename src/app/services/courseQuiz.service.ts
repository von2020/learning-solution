import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Iquiz, Iquestion, IbulkQuestions } from '../shared/Model';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LearnerService } from './learner.service';

@Injectable({
  providedIn: 'root',
})
export class CourseQuizService {
  url: string;
  FacilitatorToken: string;
  authToken: any;

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    private authService: AuthService,
    private learnerService: LearnerService
  ) {
    this.url = 'https://expertplat.com:44392';
    this.FacilitatorToken = localStorage.getItem('id_Ftoken');
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getCourseQuizByCourseId(id: number): Observable<any> {
    return this.http.get(
      this.url + '/api/v1/CourseQuiz/courseQuizByCourseId?courseId=' + id,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  getCourseQuizById(id: number): Observable<any> {
    return this.http.get(
      this.url + '/api/v1/CourseQuiz/courseQuizById?quizId=' + id,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  getCourseQuizQuestion(): Observable<any> {
    return this.http.get(
      this.url + '/api/v1/CourseQuiz/courseQuizQuestion',

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  getCourseQuizQuestionById(id: number): Observable<any> {
    return this.http.get(
      this.url + '/api/v1/CourseQuiz/courseQuizQuestionById?questionId=' + id,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  getCourseQuizQuestionByQuizId(id: number): Observable<any> {
    return this.http.get(
      this.url + '/api/v1/CourseQuiz/courseQuizQuestionByQuizId?quizId=' + id,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  getCourseQuizByResult(id: number): Observable<any> {
    return this.http.get(
      this.url + '/api/v1/CourseQuiz/courseQuizResultById?resultId=' + id,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }
  getCourseQuizByFacilitator(id: number): Observable<any> {
    return this.http.get(
      this.url +
        '/api/v1/CourseQuiz/courseQuizByFacilitatorId?facilitatorId=' +
        id,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  getCourseQuizByLearner(id: string): Observable<any> {
    return this.http.get(
      this.url +
        '/api/v1/CourseQuiz/courseQuizResultByLearnerId?learnerId=' +
        id,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  createCourseQuiz(quiz: Iquiz): Observable<any> {
    return this.http.post(
      this.url + '/api/v1/CourseQuiz/createCourseQuiz',
      JSON.stringify(quiz),
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  createCourseQuizQuestion(question: Iquestion): Observable<any> {
    return this.http.post(
      this.url + '/api/v1/CourseQuiz/createCourseQuizQuestion',
      JSON.stringify(question),
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  createBulkCourseQuizQuestion(questions: IbulkQuestions): Observable<any> {
    return this.http.post(
      this.url + '/api/v1/CourseQuiz/createBulkCourseQuizQuestion',
      JSON.stringify(questions),
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  updateCourseQuiz(quiz: Iquiz, quizId: number): Observable<any> {
    return this.http.post(
      this.url + '/api/v1/CourseQuiz/updateCourseQuiz?quizId=' + quizId,
      JSON.stringify(quiz),
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  // updateCourseQuizQuestion(question: any, id: number): Observable<any> {
  //   return this.http.post(this.url + '/api/v1/CourseQuiz/updateCourseQuizQuestion?id=' + id,
  //   JSON.stringify(question),
  //   {headers: new HttpHeaders({
  //     'content-type': 'application/json',
  //     Authorization: this.FacilitatorToken
  //               })}
  //   );
  // }

  updateCourseQuizQuestion(question, questionId): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.FacilitatorToken,
      }),
    };
    return this.http
      .put(
        `${this.url}/api/v1/CourseQuiz/updateCourseQuizQuestion?id=${questionId}`,
        question,
        httpOptions
      )
      .pipe(
        tap((updatedQuestion) =>
          console.log(`update question = ${JSON.stringify(updatedQuestion)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  // updateQuizQuestion(question: any, id: number): Observable<any> {
  //   return this.http.post(this.url + '/api/v1/CourseQuiz/updateCourseQuizQuestion?id=' + id,
  //   JSON.stringify(question),
  //   {headers: new HttpHeaders({
  //     'content-type': 'application/json',
  //     Authorization: this.FacilitatorToken
  //               })}
  //   );
  // }

  deleteCourseQuiz(quizId: number): Observable<any> {
    return this.http.delete(
      this.url + '/api/v1/CourseQuiz/deleteCourseQuiz?quizId=' + quizId,
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  deleteCourseQuizQuestion(questionId: number): Observable<any> {
    return this.http.delete(
      this.url +
        '/api/v1/CourseQuiz/deleteCourseQuizQuestion?questionId=' +
        questionId,
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.FacilitatorToken,
        }),
      }
    );
  }

  postResult(data): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    return this.http
      .post<any>(
        this.url + '/api/v1/CourseQuiz/createCourseQuizResult',
        JSON.stringify(data),
        { headers }
      )
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        })
      );
  }
}
