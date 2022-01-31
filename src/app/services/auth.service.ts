import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseUrl } from '../baseurl';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseUrl {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private currentFUserSubject: BehaviorSubject<any>;
  public currentFUser: Observable<any>;
  private currentAUserSubject: BehaviorSubject<any>;
  public currentAUser: Observable<any>;
  authToken: any;
  authFToken: any;
  authAToken: any;
  authId: any;
  user: any;
  course: any;
  facilitator: any;

  private Base_url = 'https://expertplat.com';

  private Upload_Base_url = 'https://expertplat.com:9090';
  userId: any;
  userFId: string;
  userAId: string;
  cart: any;
  cartId: any;
  private sub = new BehaviorSubject<boolean>(false);
  helper = new JwtHelperService();
  courseId: string;
  email: string;
  ftoken: string;
  result: any;
  confimationEmail: any;

  constructor(private http: HttpClient) {
    super();

    this.currentUserSubject = new BehaviorSubject<any>(
      localStorage.getItem('id_token')
    );

    this.currentFUserSubject = new BehaviorSubject<any>(
      localStorage.getItem('id_Ftoken')
    );

    this.currentAUserSubject = new BehaviorSubject<any>(
      localStorage.getItem('id_Atoken')
    );

    this.currentUser = this.currentUserSubject.asObservable();
    this.currentFUser = this.currentFUserSubject.asObservable();
    this.currentAUser = this.currentAUserSubject.asObservable();
  }

  public get baseUrl(): any {
    return this.Upload_Base_url;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get currentFUserValue(): any {
    return this.currentFUserSubject.value;
  }

  public get currentAUserValue(): any {
    return this.currentAUserSubject.value;
  }

  tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  registerLearner(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/Learner/signUp`, user, { headers })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  registerFacilitator(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/Facilitator/signUp`, user, {
        headers,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getSchoolType() {
    return this.http.get(
      this.BASE_URL + '/api/v1/SchoolType/schoolType',

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
        }),
      }
    );
  }

  // courseQuizByCourseId() {
  //   this.loadToken();

  //   let path = `/api/v1/CourseQuiz/courseQuizByCourseId?courseId=${sessionStorage.getItem('activeCourse')}`;
  //   console.log(path);
  //   return this.http.get(this.BASE_URL + path,

  //     {headers: new HttpHeaders({
  //       'content-type': 'application/json',
  //       Authorization: this.authToken
  //               })}
  //     );
  // }
  postNewSchool(data): Observable<any> {
    return this.http
      .post(
        this.BASE_URL + '/api/v1/School/schoolSignUp',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'content-type': 'application/json',
          }),
        }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  postActivation(data) {
    return this.http.put(
      this.BASE_URL + '/api/v1/School/activateAccount',
      JSON.stringify(data),
      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
        }),
      }
    );
  }

  paystackCallback(object: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http
      .post<any>('/api/Payment/updatePayment/', object, { headers })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // getCourseProgress(learnerId: any, courseId: any): Observable<any>{
  //   this.loadToken();
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: this.authToken
  // });
  //   console.log(headers);
  //   return this.http.get<any>(`${this.BASE_URL}/api/v1/Course/courseProgress?learnerId=${learnerId}&courseId=${courseId}`, {headers})
  //   // .pipe(map((response) => {
  //   //     return response;
  //   //   })
  //   // );
  // }

  // courseProgress(value: any): Observable<any>{
  //   this.loadToken();
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: this.authToken
  // });
  //   console.log(headers);
  //   return this.http.post<any>(`${this.BASE_URL}/api/v1/Course/courseProgress`,value, {headers})
  //   .pipe(map((response) => {
  //       return response;
  //     })
  //   );
  // }

  resendSchoolActivationCode(email: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/School/resendActivationCode?email=${email}`,
      { headers }
    );
  }

  changeLearnerPassword(object: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Learner/changePassword`,
        object,
        httpOptions
      )
      .pipe(
        tap((changedPassword) =>
          console.log(`change password = ${JSON.stringify(changedPassword)}`)
        ),
        // catchError(async (error) => console.log(error))
      );
  }

  resetLearnerPassword(email: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Learner/forgotPassword?email=${email}`,
      { headers }
    );
  }

  changeFacilitatorPassword(object: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Facilitator/changePassword`,
        object,
        httpOptions
      )
      .pipe(
        tap((changedPassword) =>
          console.log(`change password = ${JSON.stringify(changedPassword)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  resetFacilitatorPassword(email: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>(
      `${this.BASE_URL}/api/v1/Facilitator/forgotPassword?email=${email}`,
      { headers }
    );
  }

  resetInternalFacilitatorPassword(
    object: any,
    userId,
    sessionId,
    newPassword,
    userType
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .put(
        `${this.BASE_URL}/api/v1/Facilitator/resetInternalFacilitatorPassword?userId=${userId}&sessionId=${sessionId}&newPassword=${newPassword}&userType=${userType}`,
        object,
        httpOptions
      )
      .pipe(
        tap((resetPassword) =>
          console.log(`reset password = ${JSON.stringify(resetPassword)}`)
        ),
        catchError(async (error) => console.log(error))
      );
  }

  loginLearner(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/Learner/login`, user, { headers })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  loginFacilitator(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/Facilitator/login`, user, { headers })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  loginAdmin(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http
      .post<any>(`${this.BASE_URL}/api/v1/SystemUsers/systemUserLogin`, user, {
        headers,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public get getKey(): any {
    // return 'pk_test_74c53a49cf86f2b421b52ae3b7e5bf15cd106dd0';
    // return "pk_test_de90a356552c8f31a16b490bbbc2e5a35f74da2c";
    // return "sk_test_14eaa7371a5b875717ba9353c12aedfdfcc422c2";
    return 'pk_test_7263ce2d5ccd113026d6baceb89c1ef312353bf0';
  }

  uploadMaterial(vals): Observable<any> {
    const data = vals;

    return this.http.post(
      'https://api.cloudinary.com/v1_1/mywebsite/upload',
      data
    );
  }

  uploadImage(vals): Observable<any> {
    const data = vals;
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type' : 'multipart/form-data',
        //  'Authorization': this.authFToken,
        // 'Access-Control-Allow-Origin' : 'http://localhost:4200'
      }),
    };
    return this.http.post(
      // 'https://api.cloudinary.com/v1_1/mywebsite/image/upload'
      // ,
      `${this.BASE_URL}/api/v1/FileUpload/uploadFiles`,
      data,
      httpOptions
    );
  }

  uploadVideo(vals): Observable<any> {
    const data = vals;

    return this.http.post(
      'https://api.cloudinary.com/v1_1/mywebsite/video/upload',
      data
    );
  }

  getBanks(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(headers);
    return this.http.get<any>('https://api.paystack.co/bank', { headers });
  }

  resolveAccountNumber(accountNumber: any, bankCode: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer sk_test_14eaa7371a5b875717ba9353c12aedfdfcc422c2',
    });
    console.log(headers);
    return this.http.get<any>(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
      { headers }
    );
  }

  loadId() {
    const id = localStorage.getItem('userId');
    this.userId = id;
  }

  loadFId() {
    const id = localStorage.getItem('userFId');
    this.userFId = id;
  }

  loadAId() {
    const id = localStorage.getItem('userAId');
    this.userAId = id;
  }

  storeUserData(token, user, userId) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', JSON.stringify(userId));
    this.authToken = token;
    this.user = user;
    this.userId = userId;
  }

  storeFacilitatorData(token, user, userId) {
    localStorage.setItem('id_Ftoken', token);
    localStorage.setItem('Fuser', JSON.stringify(user));
    localStorage.setItem('userFId', JSON.stringify(userId));
    this.authFToken = token;
    this.user = user;
    this.userId = userId;
  }

  storeAdminData(token, user, userId) {
    localStorage.setItem('id_Atoken', token);
    localStorage.setItem('Auser', JSON.stringify(user));
    localStorage.setItem('userAId', JSON.stringify(userId));
    this.authAToken = token;
    this.user = user;
    this.userId = userId;
  }

  public storeEachFacilitatorData(facilitator) {
    sessionStorage.setItem('facilitator', JSON.stringify(facilitator));
    this.facilitator = facilitator;
  }

  public StoreConfimationEmail(email) {
    sessionStorage.setItem('confimationEmail', JSON.stringify(email));
    this.confimationEmail = email;
  }

  public getConfimationEmail() {
    const id = sessionStorage.getItem('confimationEmail');
    this.confimationEmail = id;
    return this.confimationEmail;
  }
  

  public getToken() {
    alert(sessionStorage.getItem('id_token'))
    const id = sessionStorage.getItem('id_token');
    this.ftoken = id;
    return this.ftoken;
  }

  public removeConfimationEmail() {
    this.confimationEmail = null;
    localStorage.removeItem('confimationEmail');
  }

  public getFacilitator() {
    const id = sessionStorage.getItem('facilitator');
    this.facilitator = id;
    return this.facilitator;
  }

  public clearFacilitatorData() {
    this.facilitator = null;
    sessionStorage.removeItem('facilitator');
  }

  storeCartData(cartId) {
    localStorage.setItem('cartId', JSON.stringify(cartId));
    this.cartId = cartId;
  }

  getCartId() {
    const id = localStorage.getItem('cartId');
    this.cartId = id;
    return this.cartId;
  }

  getEmail() {
    const email = JSON.parse(localStorage.getItem('user')).email;
    this.email = email;
    return this.email;
  }

  getAUser() {
    const auser = JSON.parse(localStorage.getItem('Auser'));
    this.user = auser;
    return this.user;
  }

  getAEmail() {
    const email = JSON.parse(localStorage.getItem('Auser')).email;
    this.email = email;
    return this.email;
  }

  getFUser() {
    const fuser = JSON.parse(localStorage.getItem('Fuser'));
    this.user = fuser;
    return this.user;
  }

  getId() {
    const id = localStorage.getItem('userId');
    this.userId = id;
    return this.userId;
  }

  getFId() {
    const id = localStorage.getItem('userFId');
    this.userFId = id;
    return this.userFId;
  }

  getAId() {
    const id = localStorage.getItem('userAId');
    this.userFId = id;
    return this.userFId;
  }

  storeCourseId(courseId) {
    localStorage.setItem('courseId', JSON.stringify(courseId));
    this.courseId = courseId;
  }

  getCourseId() {
    const id = localStorage.getItem('courseId');
    this.courseId = id;
    return this.courseId;
  }

  removeCourseId() {
    this.courseId = null;
    localStorage.removeItem('courseId');
  }

  storeQuizResult(result) {
    localStorage.setItem('result', JSON.stringify(result));
    this.result = result;
  }

  getQuizResult() {
    const quiz = localStorage.getItem('result');
    this.result = quiz;
    return this.result;
  }

  removeQuizResult() {
    this.result = null;
    localStorage.removeItem('result');
  }

  clearData() {
    localStorage.clear;
  }

  cartExist() {
    if (this.cartId == null || this.cartId == undefined) {
      return false;
    } else {
      return true;
    }
  }

  removeCart() {
    this.cartId = null;
    localStorage.removeItem('cartId');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    this.userId = null;
    this.authFToken = null;
    this.userFId = null;
    this.authAToken = null;
    this.userAId = null;
    this.courseId = null;
    // localStorage.clear();
    localStorage.removeItem('id_Atoken');
    localStorage.removeItem('Auser');
    localStorage.removeItem('userAId');
    localStorage.removeItem('id_Ftoken');
    localStorage.removeItem('Fuser');
    localStorage.removeItem('userFId');
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('courseId');
  }
}
