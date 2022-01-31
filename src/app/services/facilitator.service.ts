import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { BaseUrl } from '../baseurl';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacilitatorService extends BaseUrl {
  private Upload_Base_url = 'https://expertplat.com:9090'
  authFToken: any;
  authAToken: any;
  authToken: any;

  constructor(private http: HttpClient, private authService : AuthService) {
    super();
}

public get baseUrl(): any {
  return this.Upload_Base_url;
}

loadFToken(){
  const token = localStorage.getItem('id_Ftoken');
  this.authFToken = token;
  console.log('hey you', localStorage.getItem('id_Ftoken'))
}

loadToken(){
  const token = localStorage.getItem('id_token');
  this.authToken = token;
  console.log('hey you there', localStorage.getItem('id_token'))
}

loadAToken(){
  const token = localStorage.getItem('id_Atoken');
  this.authAToken = token;
}

getfacilitatorCoursesReviews(facilitatorId: any): Observable<any>{
  // this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    // ,
    // Authorization: this.authFToken
});
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/CourseReviews/facilitatorCoursesReviews?facilitatorId=${facilitatorId}`, {headers});
//    .pipe(map((response) => {
//      console.log(response);
//     return response;
//   })
// );
}

getFacilitators(): Observable<any> {
  this.loadToken();
  // console.log('me', value)
  console.log('see', this.authToken)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authToken, 
  });
  console.log(headers);
  return this.http.get<any>(
    `${this.BASE_URL}/api/v1/Facilitator/allFacilitators`,
    { headers }
  );
  
}

getAllCoursesByFacilitatorId(facilitatorId: any): Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});
  console.log(headers);
  //facilitatorId = JSON.parse(facilitatorId);
  console.log('this.BASE_URL/api/v1/Course/allCourseByFacilitatorId?facilitatorId=' + facilitatorId);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/Course/allCourseByFacilitatorId?facilitatorId=${facilitatorId}`, {headers});
}

getEarningsPerCourse(facilitatorId: any): Observable<any>{
  this.loadFToken();
  this.loadAToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', 
    Authorization: this.authFToken || this.authAToken
  });
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/Facilitator/earningsPerCourse?facilitatorId=${facilitatorId}`, {headers});
}

getPercentageEarnedOnCourses(facilitatorId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', 
    Authorization: this.authFToken
  });
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/Facilitator/percentageEarnedOnCourses?facilitatorId=${facilitatorId}`, {headers});
}

getTotalEarningsSettled(facilitatorId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', 
    Authorization: this.authFToken
  });
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/Facilitator/totalEarningsSettled?facilitatorId=${facilitatorId}`, {headers});
}

getTotalEarningsUnSettled(facilitatorId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json', 
    Authorization: this.authFToken
  });
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/Facilitator/totalEarningsUnSettled?facilitatorId=${facilitatorId}`, {headers});
}

getAccountDetailsByFacilitatorId(facilitatorId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/Facilitator/accountDetailsByFacilitatorId?facilitatorId=${facilitatorId}`, {headers});
}

updateDefaultFAccount(updateAccount, facilitatorId: any, accountId: any): Observable<any>{
  this.loadFToken();
  const httpOptions = {
    headers : new HttpHeaders ({ 'Content-Type' : 'application/json', Authorization: this.authFToken })
  };
  return this.http.put(`${this.BASE_URL}/api/v1/Facilitator/setAccountDetailsAsDefault?facilitatorId=${facilitatorId}&accountId=${accountId}`, updateAccount, httpOptions)
.pipe(tap(updateAccount =>
  console.log(`update account = ${JSON.stringify(updateAccount)}`)
  ),
catchError(async (error) => console.log(error)));
}

deleteAccountDetails(accountId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.delete<any>(`${this.BASE_URL}/api/v1/Facilitator/deleteAccountDetails?accountId=${accountId}`, {headers}
  );
}

updateAccountDetails(accountDetails: any, accountId: any): Observable<any>{
  this.loadFToken();
  const httpOptions = {
    headers : new HttpHeaders ({ 'Content-Type' : 'application/json', Authorization: this.authFToken })
  };
  return this.http.put(`${this.BASE_URL}/api/v1/Facilitator/updateAccountDetails?accountId=${accountId}`, accountDetails, httpOptions)
.pipe(tap(updatedAccountDetails =>
  console.log(`updated account details = ${JSON.stringify(updatedAccountDetails)}`)
  ),
catchError(async (error) => console.log(error)));
}

getAllCoursePaginationByFacilitatorId(facilitatorId: any, pageNumber: any, pageSize: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/Course/allCoursePaginationByFacilitatorId?facilitatorId=${facilitatorId}&pageNumber=${pageNumber}&pageSize=${pageSize}`, {headers});
}

getFacilitatorById(facilitatorId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': this.authFToken
});
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/Facilitator/facilitatorById?facilitatorId=${facilitatorId}`, {headers});
}

activateFacilitatorAccount(user: any): Observable<any>{
  // this.loadFToken();
  const httpOptions = {
    headers : new HttpHeaders ({ 'Content-Type' : 'application/json', 
    // Authorization: this.authFToken 
  })
  };
  return this.http.put(`${this.BASE_URL}/api/v1/Facilitator/activateAccount`, user, httpOptions)
.pipe(tap(activatedAccount =>
  console.log(`activated account = ${JSON.stringify(activatedAccount)}`)
  ),
catchError(async (error) => console.log(error)));
}

updateFacilitatorProfile(user: any): Observable<any>{
  this.loadFToken();
  const httpOptions = {
    headers : new HttpHeaders ({ 'Content-Type' : 'application/json', Authorization: this.authFToken })
  };
  return this.http.put(`${this.BASE_URL}/api/v1/Facilitator/updateProfileDetails`, user, httpOptions)
.pipe(tap(updatedFacilitatorProfile =>
  console.log(`updated profile details = ${JSON.stringify(updatedFacilitatorProfile)}`)
  ),
catchError(async (error) => console.log(error)));
}

updateFacilitatorProfilePicture(user, facilitatorId: any, profilePictureUrl: any): Observable<any>{
  this.loadFToken();
  const httpOptions = {
    headers : new HttpHeaders ({ 'Content-Type' : 'application/json', Authorization: this.authFToken }, ),
    params : new HttpParams()
                  .set('facilitatorId', `${facilitatorId}`)
                  .set('profilePictureUrl', `${profilePictureUrl}`)
  };
  return this.http.put(`${this.BASE_URL}/api/v1/Facilitator/updateProfilePicture?`, user, httpOptions)
.pipe(tap(updatedFacilitatorProfilePicture =>
  console.log(`updated profile picture = ${JSON.stringify(updatedFacilitatorProfilePicture)}`)
  ),
catchError(async (error) => console.log(error)));
}


resendFacilitatorActivationCode(email: any): Observable<any>{
  // this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: this.authFToken
});
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/Facilitator/resendActivationCode?email=${email}`, {headers});
}

createFacilitatorAccountDetail(details: any): Observable<any>{
  this.loadFToken();
  return this.http.post<any>(`${this.BASE_URL}/api/v1/Facilitator/createAccountDetails`, details, {headers: new HttpHeaders({
          'content-type': 'application/json',
          Authorization: this.authFToken
                  })})
  .pipe(map((response) => {
      return response;
    })
  );
}

createCourseObjectives(course: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.post<any>(`${this.BASE_URL}/api/v1/CourseObjectives/createCourseObjectives`, course, {headers})
  .pipe(map((response) => {
      return response;
    })
  );
}

createMultipleCourseObjectives(course: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authAToken
});
  console.log(headers);
  return this.http.post<any>(`${this.BASE_URL}/api/v1/CourseObjectives/createMultipleCourseObjectives`, course, {headers})
  .pipe(map((response) => {
      return response;
    })
  );
}

createMultipleCourseRequirements(course: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authAToken
});
  console.log(headers);
  return this.http.post<any>(`${this.BASE_URL}/api/v1/CourseObjectives/createMultipleCourseRequirements`, course, {headers})
  .pipe(map((response) => {
      return response;
    })
  );
}

createMultipleCourseTopicVideos(course: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authAToken
});
  console.log(headers);
  return this.http.post<any>(`${this.BASE_URL}/api/v1/CourseTopics/createMultipleCourseTopicVideos`, course, {headers})
  .pipe(map((response) => {
      return response;
    })
  );
}

createCourseRequirements(course: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.post<any>(`${this.BASE_URL}/api/v1/CourseRequirements/createCourseRequirements`, course, {headers})
  .pipe(map((response) => {
      return response;
    })
  );
}

createCourseTopics(course: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.post<any>(`${this.BASE_URL}/api/v1/CourseTopics/createCourseTopics`, course, {headers})
  .pipe(map((response) => {
      return response;
    })
  );
}
deleteCourse(courseId: any): Observable<any>{
  this.loadFToken();
  this.loadAToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken || this.authAToken
});
  console.log(headers);
  return this.http.delete<any>(`${this.BASE_URL}/api/v1/Course/deleteCourse?courseId=${courseId}`, {headers}
  );
}

deleteCourseTopics(courseTopicId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.delete<any>(`${this.BASE_URL}/api/v1/CourseTopics/deleteCourseTopics?courseTopicId=${courseTopicId}`, {headers}
  );
}


createCourseTopicMaterial(course: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken,
    'Access-Control-Allow-Origin': 'http://localhost:4200'
});
  console.log(headers);
  return this.http.post<any>(`${this.BASE_URL}/api/v1/CourseTopics/createCourseTopicMaterial`, course, {headers})
  .pipe(map((response) => {
      return response;
    })
  );
}

createCourseTopicVideoMaterial(course: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken,
    'Access-Control-Allow-Origin': 'http://localhost:4200'
});
  console.log(headers);
  return this.http.post<any>(`${this.BASE_URL}/api/v1/CourseTopics/createCourseTopicVideoMaterial`, course, {headers})
  .pipe(map((response) => {
      return response;
    })
  );
}

createCourseTopicVideo(course: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.post<any>(`${this.BASE_URL}/api/v1/CourseTopics/createCourseTopicVideo`, course, {headers})
  .pipe(map((response) => {
      return response;
    })
  );
}

deleteCourseTopicVideo(courseTopicVideoId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.delete<any>(`${this.BASE_URL}/api/v1/CourseTopics/deleteCourseTopicVideos?courseTopicVideoId=${courseTopicVideoId}`, {headers}
  );
}

deleteCourseTopicVideoMaterial(courseTopicVideoMaterialId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.delete<any>(`${this.BASE_URL}/api/v1/CourseTopics/deleteCourseTopicVideoMaterial?courseTopicVideoMaterialId=${courseTopicVideoMaterialId}`, {headers}
  );
}


createCourse(course: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.post<any>(`${this.BASE_URL}/api/v1/Course/createCourse`, course, {headers})
  .pipe(map((response) => {
      return response;
    })
  );
}

getCourseTopicsbyCourseId(courseId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/CourseTopics/allCourseTopicsByCourseId?courseId=${courseId}`, {headers});
//    .pipe(map((response) => {
//      console.log(response);
//     return response;
//   })
// );
}

deleteCourseRequirements(courseRequirementId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.delete<any>(`${this.BASE_URL}/api/v1/CourseRequirements/deleteCourseRequirement?courseRequirementId=${courseRequirementId}`, {headers}
  );
}

deleteCourseObjectives(courseObjectiveId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.delete<any>(`${this.BASE_URL}/api/v1/CourseObjectives/deleteCourseObjective?courseObjectiveId=${courseObjectiveId}`, {headers}
  );
}

getCourseTopicMaterialsByCourseTopicId(courseTopiclId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/CourseTopics/courseTopicMaterialsByCourseTopicId?courseTopiclId=${courseTopiclId}`, {headers});
}

getCourseTopicVideosByCourseTopicId(courseTopicId: any): Observable<any>{
  this.loadFToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authFToken
});
  console.log(headers);
  return this.http.get<any>(`${this.BASE_URL}/api/v1/CourseTopics/courseTopicVideosByCourseTopicId?courseTopiclId=${courseTopicId}`, {headers});
}

updateCourseVideoPreview(courseId: any, courseVideoPreviewUrl: any): Observable<any>{
  this.loadFToken();
  const httpOptions = {
    headers : new HttpHeaders ({ 'Content-Type' : 'application/json', Authorization: this.authFToken })
  };
  return this.http.put(`${this.BASE_URL}/api/v1/Course/updateCourseVideoPreview?courseId=${courseId}&courseVideoPreviewUrl=${courseVideoPreviewUrl}`, courseId, httpOptions)
.pipe(tap(updatePreview =>
  console.log(`update preview = ${JSON.stringify(updatePreview)}`)
  ),
catchError(async (error) => console.log(error)));
}

loggedInFacilitator(){
  this.loadFToken();
  if (this.authFToken == null || this.authFToken == undefined) {
        return false;
      } else {
        return true;
    }
}

}
