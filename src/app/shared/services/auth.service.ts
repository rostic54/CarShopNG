import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {
  currentTokenSubject = new BehaviorSubject(null);
  email;

  constructor(private toasterService: ToasterService) {
  }

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

  authInit() {
    firebase.initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;
        user.getIdToken().then((token) => {
          this.currentTokenSubject.next(token);
        });
      } else {
        this.currentTokenSubject.next(null);
      }
    });
  }

  getToken() {
    return this.currentTokenSubject.value;
  }

  logOut() {
    firebase.auth().signOut().then(() => {
      this.currentTokenSubject.next(null);
    }).catch((error) => {
      console.log('error while Outing');
    });
  }

  isAdmin() {
    return this.email === 'test@test.com';
  }
}
