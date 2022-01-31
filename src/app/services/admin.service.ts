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
export class AdminService extends BaseUrl {
  private Upload_Base_url = 'https://expertplat.com:9090';
  authFToken: any;
  authAToken: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  public get baseUrl(): any {
    return this.Upload_Base_url;
  }

  loadAToken() {
    const token = localStorage.getItem('id_Atoken');
    this.authAToken = token;
  }

  createInternalFacilitator(details: any): Observable<any> {
    this.loadAToken();
    return this.http
      .post<any>(
        `${this.BASE_URL}/api/v1/Facilitator/createFacilitator`,
        details,
        {
          headers: new HttpHeaders({
            'content-type': 'application/json',
            Authorization: this.authAToken,
          }),
        }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  resendPasswordResetLink(email: any): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Facilitator/resendPasswordResetLink?email=${email}`,
      { headers }
    );
  }

  createCourseCategory(course: any): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http
      .post<any>(
        `${this.BASE_URL}/api/v1/CourseCategory/createCourseCategory`,
        course,
        { headers }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  updateCourseCategory(updateCategory, courseCategoryId: any): Observable<any> {
    this.loadAToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authAToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/CourseCategory/updateCourseCategory?courseCategoryId=${courseCategoryId}`,
        updateCategory,
        httpOptions
      )
      .pipe(
        tap((updatedCategory) =>
          console.log(`update category = ${JSON.stringify(updatedCategory)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  deleteCourseCategory(courseCategoryId: any): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http.delete<any>(
      `${this.BASE_URL}/api/v1/CourseCategory/deleteCourseCategory?courseCategoryId=${courseCategoryId}`,
      { headers }
    );
  }

  deleteCourseAttachedToEnrollee(courseId: any): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http.delete<any>(
      `${this.BASE_URL}/api/v1/Course/deleteCourseAttachedToEnrollee?courseId=${courseId}`,
      { headers }
    );
  }

  createCourseSubCategory(course: any): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http
      .post<any>(
        `${this.BASE_URL}/api/v1/CourseSubCategory/createCourseSubCategory`,
        course,
        { headers }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  updateCourseSubCategory(
    updateSubCategory,
    courseSubCategoryId: any
  ): Observable<any> {
    this.loadAToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authAToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/CourseSubCategory/updateCourseSubCategory?courseSubCategoryId=${courseSubCategoryId}`,
        updateSubCategory,
        httpOptions
      )
      .pipe(
        tap((updatedSubCategory) =>
          console.log(
            `update subCategory = ${JSON.stringify(updatedSubCategory)}`
          )
        ),
        catchError(async (error) => console.log(error))
      );
  }

  deleteCourseSubCategory(courseSubCategoryId: any): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http.delete<any>(
      `${this.BASE_URL}/api/v1/CourseSubCategory/deleteCourseSubCategory?courseSubCategoryId=${courseSubCategoryId}`,
      { headers }
    );
  }

  createCoupon(item: any): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/CouponCode/createCouponCodes`, item, {
        headers,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAllCouponCodes(): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CouponCode/allCouponCodes`,
      { headers }
    );
  }

  deleteCourseReview(courseReviewId: any): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http.delete<any>(
      `${this.BASE_URL}/api/v1/CourseReviews/deleteCourseReviews?courseReviewId=${courseReviewId}`,
      { headers }
    );
  }

  getFacilitators(): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Facilitator/allFacilitators`,
      { headers }
    );
  }

  approveCourseCreation(courseId: any): Observable<any> {
    this.loadAToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authAToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Course/approveCourseCreation?courseId=${courseId}`,
        courseId,
        httpOptions
      )
      .pipe(
        tap((approveCourse) =>
          console.log(`approve course = ${JSON.stringify(approveCourse)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  

  approveCourseTopicVideo(courseTopicVideoId: any): Observable<any> {
    this.loadAToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authAToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/CourseTopics/approveCourseTopicVideo?courseTopicVideoId=${courseTopicVideoId}`,
        courseTopicVideoId,
        httpOptions
      )
      .pipe(
        tap((approveVideo) =>
          console.log(`approve video = ${JSON.stringify(approveVideo)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  approveCourseTopicMaterial(courseTopicMateriaId: any): Observable<any> {
    this.loadAToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authAToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/CourseTopics/approveCourseTopicMaterial?courseTopicMateriaId=${courseTopicMateriaId}`,
        courseTopicMateriaId,
        httpOptions
      )
      .pipe(
        tap((approveMaterial) =>
          console.log(`approve material = ${JSON.stringify(approveMaterial)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  updateDefaultPercentageEarnings(
    updatePercentage,
    percentage: any,
    courseId: any
  ): Observable<any> {
    this.loadAToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authAToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Course/updateDefaultPercentageEarningsPerCourse?Id=${courseId}&percentage=${percentage}`,
        updatePercentage,
        httpOptions
      )
      .pipe(
        tap((updatePercentage) =>
          console.log(`update percentage = ${JSON.stringify(updatePercentage)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  updatePercentageEarnedOnCourses(
    updatePercentage,
    percentage: any,
    courseId: any
  ): Observable<any> {
    this.loadAToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authAToken,
      }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Course/updatePercentageEarnedOnCourses?courseId=${courseId}&percentage=${percentage}`,
        updatePercentage,
        httpOptions
      )
      .pipe(
        tap((updatePercentage) =>
          console.log(`update percentage = ${JSON.stringify(updatePercentage)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  payFacilitator(data: any): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    return this.http
      .post<any>(
        `${this.BASE_URL}/api/v1/PaymentDisbursement/facilitatorsTotalEarnings`,
        data,
        { headers }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getPercentagesEarnedOnCourses(): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/percentageEarnedOnCourses`,
      { headers }
    );
  }

  getFacilitatorsUnSettledEarnings(
    fromDate: any,
    toDate: any
  ): Observable<any> {
    this.loadAToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authAToken,
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Facilitator/facilitatorsUnSettledEarnings?fromDate=${fromDate}&toDate=${toDate}`,
      { headers }
    );
  }

  loggedInAdmin() {
    this.loadAToken();
    if (this.authAToken == null || this.authAToken == undefined) {
      return false;
    } else {
      return true;
    }
  }
}
