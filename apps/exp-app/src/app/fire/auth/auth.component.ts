import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { FireAuthService } from '@nx-fire/auth'

@Component({
  selector: 'nx-az-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  login = this._fb.group({
    email: [],
    password: [],
  })

  create = this._fb.group({
    email: [],
    password: [],
  })

  loading$ = this._fa.loading$

  error$ = this._fa.error$

  user$ = this._fa.user$

  constructor(private _fb: FormBuilder, private _fa: FireAuthService) {}

  onLogin(value: any) {
    console.log(value)
    this._fa.login(value)
  }
  onCreate(value?: any) {
    console.log(value)

    this._fa.createEmailAndPassword(this.login.value)
  }
}
