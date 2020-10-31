import { FormBuilder } from '@nx-feat/forms'
import { Component, OnInit } from '@angular/core'
import { Validators } from '@angular/forms'

class SignUp {
  name: string
  email: string
  birthday: Date
  weight?: number
}

@Component({
  selector: 'nx-az-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  form = this._fb.group<SignUp>({
    name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    birthday: [null, [Validators.required]],
    weight: [null, [Validators.min(0)]],
  })
  constructor(private _fb: FormBuilder) {}

  ngOnInit() {}
}
