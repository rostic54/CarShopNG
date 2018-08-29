import {of} from 'rxjs';

export class MockAuthService {
  currentTokenSubject = of(null);

  signUpUser(cred) {

  }

  signInUser(email, password) {
  }

  authInit() {}

  getToken() {
    return this.currentTokenSubject;
  }

  logOut() {}

  isAdmin() {
    return true;
  }
}
