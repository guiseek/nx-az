import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { FireAuthService } from '@nx-fire/auth'

@Component({
  selector: 'nx-az-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  form = this._fb.group({
    email: [],
    password: [],
  })

  loading$ = this._fa.loading$

  error$ = this._fa.error$

  user$ = this._fa.user$

  constructor(private _fb: FormBuilder, private _fa: FireAuthService) {}

  onSubmit() {
    this._fa.createEmailAndPassword(this.form.value)
  }
}
