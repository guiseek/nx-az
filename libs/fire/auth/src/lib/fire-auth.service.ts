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
  auth$ = this.afa.authState
  currentUser = this.afa.currentUser

  private user = new Subject<FireAuthUser>()
  user$ = this.user.asObservable()

  private loading = new Subject<boolean>()
  loading$ = this.loading.asObservable()

  private error = new Subject<string>()
  error$ = this.error.asObservable()

  constructor(private readonly afa: AngularFireAuth) {}

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
