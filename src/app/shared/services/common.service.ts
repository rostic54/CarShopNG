import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';

/**
 * @summary Common Service
 */
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // filterData = new Subject<any>();

  constructor() {
  }

  /**
   * @summary matching of password and repeatPassword
   * @param passwordFormGroup
   * @return true or null
   */
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

  /**
   * @summary ban to attempt register as admin
   * @param control - value of field 'name' of form
   * @return resolution or null
   */
  antiAdmin(control: FormControl): { [s: string]: boolean } {
    const forbiddenName = ['admin'];
    if (forbiddenName.indexOf(control.value.toLowerCase()) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  /**
   * @summary if subscription is available then unsubscribe
   * @param subscription
   */
  checkSubscription(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
