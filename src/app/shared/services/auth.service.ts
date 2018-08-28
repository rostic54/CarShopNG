import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {environment} from '../../../environments/environment';

/**
 * @summary Auth Service
 */
@Injectable()
export class AuthService {
  currentTokenSubject = new BehaviorSubject(null);
  email;
  token: string;

  /**
   *  @param toasterService - Toaster Service
   */
  constructor(private toasterService: ToasterService) {
  }

  /**
   * @summary passing user information for registration and checking data for coincidence
   * @param cred - user info email-password
   */
  signUpUser(cred: { email: string, password: string }) {
    firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password)
      .then((response) => {
          this.signInUser(cred.email, cred.password);
          this.toasterService.pop('success', 'Hello', 'You\'ve signed in');
        }
      ).catch(
      error => {
        this.currentTokenSubject.next(null);
        this.toasterService.pop('error', 'Error', 'This email has already registered!');

      }
    );
  }

  /**
   * @summary Passing data to server for signIn and getting token
   * @param email - user email
   * @param password - user password
   */
  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
          firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
                this.currentTokenSubject.next(token);
                this.toasterService.pop('success', 'Hello', 'You\'ve signed in');

              }
            );
        }
      ).catch(error => {
        this.currentTokenSubject.next(null);
        this.toasterService.pop('error', 'Wrong data', 'Try again');
      }
    );
  }

  /**
   * @summary Initialization by needed key & domain. Checking existence token for logIn or logOut when the application start
   */
  authInit() {
    firebase.initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain
    });

    this.checkLogining();

  }

  /**
   * Checking user was loginedIn or not by request from DB and receiving of token
   */
  checkLogining(): Promise<string | boolean> {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.email = user.email;
            user.getIdToken().then((token) => {
              this.currentTokenSubject.next(token);
              return resolve(token);
            });
          } else {
            return resolve(null);
          }
        }
      );
    });
  }

  /**
   * @summary receive value of current token
   * @return current token value
   */
  getToken() {
    return this.currentTokenSubject.value;
  }

  /**
   * @summary logOut - current rewrite token to null
   */
  logOut() {
    firebase.auth().signOut().then(() => {
      this.currentTokenSubject.next(null);
    }).catch((error) => {
      console.log('error while Outing');
    });
  }

  /**
   * @summary compare entered data with admin email
   * @return boolean result of compare
   */
  isAdmin() {
    return this.email === 'admin@admin.com';
  }
}
