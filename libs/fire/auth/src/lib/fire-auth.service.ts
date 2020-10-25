import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { FireAuthMessage } from './fire-auth.message'
import { FireAuthError } from './fire-auth.types'
import { AuthWithEmailAndPassword, FireAuthUser } from './fire-auth.interfaces'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FireAuthService {
  /**
   * Observable of authentication state; as of Firebase 4.0 this is only triggered via sign-in/out
   */
  auth$ = this.afa.authState

  /**
   * Promise of authentication state;
   */
  current = this.afa.currentUser

  /**
   * Promise of authentication state;
   * @deprecated uses only `current`
   */
  get currentUser() {
    return this.current
  }

  /**
   * Subject of authenticated user
   * @private
   */
  private user = new Subject<FireAuthUser>()

  /**
   * Observable of authenticated user
   */
  user$ = this.user.asObservable()

  /**
   * Subject of loading state
   * @private
   */
  private loading = new Subject<boolean>()

  /**
   * Observable of loading state
   */
  loading$ = this.loading.asObservable()

  /**
   * Subject of error message
   * @private
   */
  private error = new Subject<string>()

  /**
   * Observable of error message
   */
  error$ = this.error.asObservable()

  constructor(private readonly afa: AngularFireAuth) {}

  /**
   * Create an user in Firebase Authentication
   * @param {AuthWithEmailAndPassword} { email, password }
   */
  createEmailAndPassword({ email, password }: AuthWithEmailAndPassword) {
    this._start()
    this.afa
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) this._setUser(user)
        this._stop()
      })
      .catch((error: FireAuthError) => {
        this.error.next(FireAuthMessage.getByError(error))
        this._stop()
      })
  }

  /**
   * Login user in Firebase Authentication
   * @param {AuthWithEmailAndPassword} { email, password }
   */
  login({ email, password }: AuthWithEmailAndPassword) {
    this._start()
    this.afa
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) this._setUser(user)
        this._stop()
      })
      .catch((error: FireAuthError) => {
        this.error.next(FireAuthMessage.getByError(error))
        this._stop()
      })
  }

  /**
   * Send email with password reset link
   * @param {string} { email, password }
   */
  async resetPassword(email: string) {
    this._start()
    return this.afa
      .sendPasswordResetEmail(email)
      .then(() => {
        this._stop()
      })
      .catch((error) => {
        this.error.next(FireAuthMessage.getByError(error))
        this._stop()
      })
  }

  private _setUser(user: firebase.User) {
    this.user.next({
      name: user?.displayName,
      phone: user?.phoneNumber,
      photo: user?.photoURL,
      email: user?.email,
    })
  }

  private _start() {
    this.loading.next(true)
  }
  private _stop() {
    this.loading.next(false)
  }
}
