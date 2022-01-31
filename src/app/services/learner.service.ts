import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseUrl } from '../baseurl';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LearnerService extends BaseUrl {
  private Upload_Base_url = 'https://expertplat.com:9090';
  authToken: any;
  authFToken: any;
  facilitator: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  public get baseUrl(): any {
    return this.Upload_Base_url;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadFToken() {
    const token = localStorage.getItem('id_Ftoken');
    this.authFToken = token;
  }

  createLearnerAccountDetail(details: any): Observable<any> {
    this.loadToken();
    return this.http
      .post<any>(
        `${this.BASE_URL}/api/v1/Learner/createAccountDetails`,
        details,
        {
          headers: new HttpHeaders({
            'content-type': 'application/json',
            Authorization: this.authToken,
          }),
        }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  courseProgress(
    learnerId: any,
    courseId: any,
    videoId: any,
    value: any
  ): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http
      .post<any>(
        `${this.BASE_URL}/api/v1/Course/courseProgress?learnerId=${learnerId}&courseId=${courseId}&videoId=${videoId}`,
        value,
        { headers }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getCourseTopicCompletedVideoByCourseId(
    courseId: any,
    courseEnrolleeId: any,
    learnerId: any
  ): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseTopics/courseTopicCompletedVideoByCourseId?courseId=${courseId}&courseEnrolleeId=${courseEnrolleeId}&learnerId=${learnerId}`,
      { headers }
    );
    // .pipe(map((response) => {
    //     return response;
    //   })
    // );
  }

  getCourseProgress(learnerId: any, courseId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/courseProgress?learnerId=${learnerId}&courseId=${courseId}`,
      { headers }
    );
    // .pipe(map((response) => {
    //     return response;
    //   })
    // );
  }

  getCourseCertificate(learnerId: any, courseId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/courseCertificate?learnerId=${learnerId}&courseId=${courseId}`,
      { headers }
    );
    // .pipe(map((response) => {
    //     return response;
    //   })
    // );
  }

  getCourseTopicCompletedVideoByVideoId(
    videoId: any,
    courseEnrolleeId: any,
    learnerId: any
  ): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseTopics/courseTopicCompletedVideoByVideoId?videoId=${videoId}&courseEnrolleeId=${courseEnrolleeId}&learnerId=${learnerId}`,
      { headers }
    );
    // .pipe(map((response) => {
    //     return response;
    //   })
    // );
  }

  searchCoursesEnrolledFor(learnerId: any, courseName: any): Observable<any> {
    // this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: this.authToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/searchCoursesEnrolledFor?learnerId=${learnerId}&courseName=${courseName}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getLearners(): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(`${this.BASE_URL}/api/v1/Learner/allLearners`, {
      headers,
    });
  }

  getLearnerById(learnerId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Learner/learnerById?learnerId=${learnerId}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getRecommendedCourses(learnerId: any): Observable<any> {
    // this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/recommendedCourses?learnerId=${learnerId}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getAllCoursesLearnerEnrolledFor(learnerId: any): Observable<any> {
    this.loadToken();
    console.log(this.authToken)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/allCoursesLearnerEnrolledFor?learnerId=${learnerId}`,
      { headers }
    );
  }

  getAllArchivedCoursesEnrolledFor(learnerId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/allArchivedCoursesEnrolledFor?learnerId=${learnerId}`,
      { headers }
    );
  }

  getAllUnarchivedCoursesEnrolledFor(learnerId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/allUnArchivedCoursesEnrolledFor?learnerId=${learnerId}`,
      { headers }
    );
  }

  archiveOrUnArchiveCourseEnrolledFor(
    updateArchive,
    learnerId: any,
    courseId: any
  ): Observable<any> {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Course/archiveOrUnArchiveCourseEnrolledFor?learnerId=${learnerId}&courseId=${courseId}`,
        updateArchive,
        httpOptions
      )
      .pipe(
        tap((updateArchive) =>
          console.log(`update archive = ${JSON.stringify(updateArchive)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  getCoursesByFacilitatorLearnerEnrolledFor(
    facilitatorId: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/coursesByFacilitatorLearnersEnrolledFor?facilitatorId=${facilitatorId}`,
      { headers }
    );
  }

  getAccountDetailsByLearnerId(learnerId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Learner/accountDetailsByLearnerId?learnerId=${learnerId}`,
      { headers }
    );
  }

  deleteLearnerAccountDetails(accountId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.delete<any>(
      `${this.BASE_URL}/api/v1/Learner/deleteAccountDetails?accountId=${accountId}`,
      { headers }
    );
  }

  updateLearnerAccountDetails(
    accountDetails: any,
    accountId: any
  ): Observable<any> {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Learner/updateAccountDetails?accountId=${accountId}`,
        accountDetails,
        httpOptions
      )
      .pipe(
        tap((updatedAccountDetails) =>
          console.log(
            `updated account details = ${JSON.stringify(updatedAccountDetails)}`
          )
        ),
        catchError(async (error) => console.log(error))
      );
  }

  getAllCoursesLearnerEnrolledForByPagination(
    learnerId: any,
    pageNumber: any,
    pageSize: any
  ): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/allCoursesLearnerEnrolledForByPagination?learnerId=${learnerId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers }
    );
  }

  verifyPasscode(courseId, passcode): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/verifyCoursePassCode?courseId=${courseId}&passcode=${passcode}`,
      { headers }
    );
  }

  completePayment(
    cartId: any,
    learnerId: any,
    reference: any
  ): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/verifyPayment?cartId=${cartId}&learnerId=${learnerId}&reference=${reference}`,
      { headers }
    );
  }

  activateAccount(user: any): Observable<any> {
    // this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //  Authorization: this.authToken
      }),
    };
    return this.http
      .put(`${this.BASE_URL}/api/v1/Learner/activateAccount`, user, httpOptions)
      .pipe(
        tap((activatedAccount) =>
          console.log(`activated account = ${JSON.stringify(activatedAccount)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  resendLearnerActivationCode(email: any): Observable<any> {
    // this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Learner/resendActivationCode?email=${email}`,
      { headers }
    );
  }

  createLearnerToFacilitator(learnerId: any, FacilitatorId: any): Observable<any> {
    this.loadToken();
    console.log('hi',learnerId)
    console.log('see',FacilitatorId)
    console.log('hey',this.authToken)
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': this.authToken
    // });
    // console.log(headers);
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/FacilitatorsLearners/LinkLearnerProfileToFacilitator?learnerId=${learnerId}&facilitatorId=${FacilitatorId}`,  {
          headers: new HttpHeaders({
            'content-type': 'application/json',
            // 'Authorization': this.authToken,
          }),
        })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  updateLearnerProfile(user: any): Observable<any> {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Learner/updateProfileDetails`,
        user,
        httpOptions
      )
      .pipe(
        tap((updatedLearnerProfile) =>
          console.log(
            `updated profile details = ${JSON.stringify(updatedLearnerProfile)}`
          )
        ),
        catchError(async (error) => console.log(error))
      );
  }

  updateLearnerProfilePicture(
    user,
    learnerId: any,
    profilePictureUrl: any
  ): Observable<any> {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
      params: new HttpParams()
        .set('learnerId', `${learnerId}`)
        .set('profilePictureUrl', `${profilePictureUrl}`),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Learner/updateProfilePicture?`,
        user,
        httpOptions
      )
      .pipe(
        tap((updatedLearnerProfilePicture) =>
          console.log(
            `updated profile picture = ${JSON.stringify(
              updatedLearnerProfilePicture
            )}`
          )
        ),
        catchError(async (error) => console.log(error))
      );
  }

  courseQuizQuestions(quizId: number) {
    this.loadToken();
    this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authFToken,
    });
    let path = `/api/v1/CourseQuiz/courseQuizQuestionByQuizId?quizId=${quizId}`;
    console.log(path);
    return this.http.get(
      this.BASE_URL + path,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.authToken || this.authFToken,
        }),
      }
    );
  }

  getCourseQuizByResult(id: number): Observable<any> {
    this.loadToken();
    return this.http.get(
      `${this.BASE_URL}/api/v1/CourseQuiz/courseQuizResultById?resultId=${id}`,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.authToken,
        }),
      }
    );
  }

  courseQuizByCourseId(courseId: any) {
    this.loadToken();

    let path = `/api/v1/CourseQuiz/courseQuizByCourseId?courseId=${courseId}`;
    console.log(path);
    return this.http.get(
      this.BASE_URL + path,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.authToken,
        }),
      }
    );
  }

  deleteCourseEnrolled(courseEnrollId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.delete<any>(
      `${this.BASE_URL}/api/v1/Course/deleteCourseEnrolledFor?courseEnrollId=${courseEnrollId}`,
      { headers }
    );
  }

  deleteCourseEnrolledbyCourseId(courseId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.delete<any>(
      `${this.BASE_URL}/api/v1/Course/deleteAllCoursesEnrolledForByCourseId?courseId=${courseId}`,
      { headers }
    );
  }

  createCart(): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // 'Authorization': this.authToken
    });
    console.log(headers);
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/Cart/createCart`, { headers })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  addToCart(item: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // 'Authorization': this.authToken
    });
    console.log(headers);
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/Cart/addItemsToCart`, item, {
        headers,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  applyCoupon(item: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/CouponCode/applyCouponCodes`, item, {
        headers,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  courseEnroll(item: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/Course/courseEnroll`, item, {
        headers,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  rateCourse(value: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/CourseRating/rateCourse`, value, {
        headers,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  createCourseTopicCompletedVideo(value: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http
      .post<any>(
        `${this.BASE_URL}/api/v1/CourseTopics/createCourseTopicCompletedVideo`,
        value,
        { headers }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  reviewCourse(value: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/CourseReviews/reviewCourse`, value, {
        headers,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deleteCartItems(cartItemId: any, cartId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // 'Authorization': this.authToken
    });
    console.log(headers);
    return this.http.delete<any>(
      `${this.BASE_URL}/api/v1/Cart/deleteCartItems?cartItemId=${cartItemId}&cartId=${cartId}`,
      { headers }
    );
  }

  getAllCourseEnrolledForByCourseId(courseId: any): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/allCourseEnrolledForByCourseId?courseId=${courseId}`,
      { headers }
    );
  }

  updateStatusForCourseEnrolledFor(updateStatus: any): Observable<any> {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Course/updateStatusForCourseEnrolledFor`,
        updateStatus,
        httpOptions
      )
      .pipe(
        tap((updateStatus) =>
          console.log(`updated status = ${JSON.stringify(updateStatus)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  loggedIn() {
    this.loadToken();
    console.log(this.authToken);
    if (this.authToken == null || this.authToken == undefined) {
      return false;
    } else {
      return true;
    }
  }
}
