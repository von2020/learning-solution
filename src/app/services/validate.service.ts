import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.FirstName == "" || user.LastName == "" || user.Email == ""
       || user.Password == "" || user.ConfirmPassword == "" || user.PhoneNumber == "") {
      return false;
    } 
  //   if(user == undefined) {
  //    return false;
  //  } 
    else {
      return true;
    }
  }

  validateNoEmail(email) {
    if(email == "") {
      return false;
    }
    else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

  }

  validatePassword(str) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
  }

  validateSchoolCode(str) {
    var re =  /[A-Z]+/;
    return re.test(str);
  }

}
