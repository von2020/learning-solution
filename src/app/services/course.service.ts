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
export class CourseService extends BaseUrl {
  private Upload_Base_url = 'https://expertplat.com:9090';
  authFToken: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  loadFToken() {
    const token = localStorage.getItem('id_Ftoken');
    this.authFToken = token;
    console.log('hey', this.authFToken)
  }

  public get baseUrl(): any {
    return this.Upload_Base_url;
  }

  applyCouponCode(code: string): Observable<any> {
    // this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // Authorization: this.authFToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CouponCode/couponCodesByCouponCode?couponCode=${code}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getCourseRatingByCourseId(courseId: any): Observable<any> {
    // this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // Authorization: this.authFToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseRating/courseRatingByCourseId?courseId=${courseId}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getAverageCourseRatingByCourseId(courseId: any): Observable<any> {
    // this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // Authorization: this.authFToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseRating/courseAverageRating?courseId=${courseId}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getCourseRatingAndReviewByCourseId(courseId: any): Observable<any> {
    // this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // Authorization: this.authFToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/courseRatingAndReviewByCourseId?courseId=${courseId}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getCartItemsById(cartId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Cart/CartItems?cartId=${cartId}`,
      { headers }
    );
  }

  getCartSubTotalCheckOut(cartId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Cart/cartSubTotalCheckOut?cartId=${cartId}`,
      { headers }
    );
  }

  getAllCourse(pageNumber, pageSize): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/allCourses?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers }
    );
  }

  getCourseLevel(): Observable<any> {
    // this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseLevel/allCourseLevel`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getCourseReviewsbyPagination(
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseReviews/courseReviews?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers }
    );
  }

  getCourseReviewsbyCourseId(courseId: any): Observable<any> {
    // this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // Authorization: this.authFToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseReviews/courseReviewsByCourseId?courseId=${courseId}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getCourseReviewsAtRandom(noOfCourseReviews: any): Observable<any> {
    // this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // Authorization: this.authFToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseReviews/courseReviewsAtRandom?noOfCourseReviews=${noOfCourseReviews}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getCourseRequirementsbyCourseId(courseId: any): Observable<any> {
    // this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // Authorization: this.authFToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseRequirements/courseRequirementByCourseId?courseId=${courseId}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getCourseObjectivesbyCourseId(courseId: any): Observable<any> {
    // this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // Authorization: this.authFToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseObjectives/courseObjectivesByCourseId?courseId=${courseId}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  searchCourseByCourseName(courseName: any): Observable<any> {
    // this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: this.authToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/searchCourseByCourseName?courseName=${courseName}`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getPopularCourses(): Observable<any> {
    // this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authToken
    });
    console.log(headers);
    return this.http.get<any>(`${this.BASE_URL}/api/v1/Course/popularCourses`, {
      headers,
    });
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  createMostViewdCourses(courseId: any): Observable<any> {
    // this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // ,
      // 'Authorization': this.authToken
    });
    console.log(headers);
    return this.http
      .post<any>(
        `${this.BASE_URL}/api/v1/Course/createMostViewedCourses?courseId=${courseId}`,
        { headers }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getMostViwedCourses(): Observable<any> {
    // this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/mostViewedCourses`,
      { headers }
    );
    //    .pipe(map((response) => {
    //      console.log(response);
    //     return response;
    //   })
    // );
  }

  getCoursesByStatusId(statusId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/coursesByStatusId?statusId=${statusId}`,
      { headers }
    );
  }

  getLearnersByStatusId(facilitatorId: any): Observable<any> {
    this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authFToken
    });
    
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/FacilitatorsLearners/GetAllLearnersLinkedToFacilitator?facilitatorId=${facilitatorId}`,
      { headers }
    );
  }

  approveLearner(learnerId: any, facilitatorId: any ): Observable<any> {
    console.log('hey', learnerId)
    console.log('hey', facilitatorId)
    this.loadFToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authFToken,
      }),
    };
    return this.http
      .post(
        `${this.BASE_URL}/api/v1/FacilitatorsLearners/ApproveLearnerLinkToFacilitator?learnerId=${learnerId}&facilitatorId=${facilitatorId}`,
        learnerId,
        
        httpOptions
      )
      .pipe(
        tap((approveCourse) =>
          console.log(`approve course = ${JSON.stringify(approveCourse)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  declineLearner(learnerId: any, facilitatorId: any ): Observable<any> {
    console.log('hey', learnerId)
    console.log('hey', facilitatorId)
    this.loadFToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authFToken,
      }),
    };
    return this.http
      .post(
        `${this.BASE_URL}/api/v1/FacilitatorsLearners/DeclineLearnerLinkToFacilitator?learnerId=${learnerId}&facilitatorId=${facilitatorId}`,
        learnerId,
        
        httpOptions
      )
      .pipe(
        tap((approveCourse) =>
          console.log(`approve course = ${JSON.stringify(approveCourse)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  getCoursesByCategoryId(categoryId: any, learnerId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/coursesByCategoryId?categoryId=${categoryId}&learnerId=${learnerId}`,
      { headers }
    );
  }

  courseByCategoryId(categoryId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/coursesByCategoryId?categoryId=${categoryId}`,
      { headers }
    );
  }

  getCoursesBySubCategoryId(subCategoryId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/coursesBySubCategoryId?subCategoryId=${subCategoryId}`,
      { headers }
    );
  }

  getCoursesPaginationByCategoryId(
    categoryId: any,
    pageNumber: any,
    pageSize: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/coursesPaginationByCategoryId?categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers }
    );
  }

  getCoursesSubCategoryPaginationByCategoryId(
    courseCategoryId: any,
    pageNumber: any,
    pageSize: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseSubCategory/allCourseSubCategoryByCourseCategoryIdPagination?pageNumber=${pageNumber}&pageSize=${pageSize}&courseCategoryId=${courseCategoryId}`,
      { headers }
    );
  }

  getCoursesPaginationBySubCategoryId(
    subCategoryId: any,
    pageNumber: any,
    pageSize: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/coursesPaginationBySubCategoryId?subCategoryId=${subCategoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers }
    );
  }

  getCoursesById(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/courseById?courseId=${id}`,
      { headers }
    );
  }

  getCoursesByLevelId(levelId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/coursesByLevelId?levelId=${levelId}`,
      { headers }
    );
  }

  getCoursesByTypeId(typeId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/coursesByTypeId?typeId=${typeId}`,
      { headers }
    );
  }

  getCourseTopicByCourseId(courseId: any): Observable<any> {
    // this.loadFToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': this.authFToken
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseTopics/allCourseTopicsByCourseId?courseId=${courseId}`,
      { headers }
    );
  }

  getAllCourseType(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseType/allCourseType`,
      { headers }
    );
  }

  getCoursesCategories(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseCategory/allCourseCategory`,
      { headers }
    );
  }

  getCourseSubCategories(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseSubCategory/allCourseSubCategory`,
      { headers }
    );
  }

  getPopularCoursesCategories(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseCategory/popularCourseCategory`,
      { headers }
    );
  }

  getTopCoursesInCourseCategory(categoryId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseCategory/topCoursesInCourseCategory?categoryId=${categoryId}`,
      { headers }
    );
  }

  getCourseCategoryById(courseCategoryId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseCategory/courseCategoryById?courseCategoryId=${courseCategoryId}`,
      { headers }
    );
  }

  getCourseSubCategoryById(courseSubCategoryId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseSubCategory/courseSubCategoryById?courseSubCategoryId=${courseSubCategoryId}`,
      { headers }
    );
  }

  getAllCourseSubCategoryById(courseCategoryId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/CourseSubCategory/allCourseSubCategoryByCourseCategoryId?courseCategoryId=${courseCategoryId}`,
      { headers }
    );
  }

  getCourseType(typeId: any, pageNumber: any, pageSize: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Course/coursesPaginationByTypeId/?typeId=${typeId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers }
    );
  }
}
