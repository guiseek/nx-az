import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'nx-az-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent {
  form = this._fb.group({
    email: [],
    password: [],
  })

  @Output() login = new EventEmitter()

  constructor(private _fb: FormBuilder) {}

  onLogin() {
    this.form.markAllAsTouched()
    this.login.emit(this.form.value)
  }
}
