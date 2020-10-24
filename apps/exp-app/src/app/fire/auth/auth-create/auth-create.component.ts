import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'nx-az-auth-create',
  templateUrl: './auth-create.component.html',
  styleUrls: ['./auth-create.component.scss'],
})
export class AuthCreateComponent {
  form = this._fb.group({
    email: [],
    password: [],
  })

  @Output() create = new EventEmitter()

  constructor(private _fb: FormBuilder) {}

  onCreate() {
    this.create.emit(this.form.value)
  }
}
