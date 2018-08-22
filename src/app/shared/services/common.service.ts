import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // filterData = new Subject<any>();

  constructor() { }

  validate(passwordFormGroup) {
    const password = passwordFormGroup.value.password;
    const repeatPassword = passwordFormGroup.value.password2;

    if (repeatPassword.length <= 0) {
      return null;
    }

    if (repeatPassword !== password) {
      return {
        doesMatchPassword: true
      };
    }
    return null;
  }

  antiAdmin(control: FormControl): {[s: string]: boolean} {
    const forbiddenName = ['admin'];
    if (forbiddenName.indexOf(control.value.toLowerCase()) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  // getFilterCondition(data: FilterModel) {
  //   this.filterData.next(data);
  // }
  //
  checkSubscription(subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
