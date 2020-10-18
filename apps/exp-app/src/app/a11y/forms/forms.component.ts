import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'nx-az-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  form = this._fb.group({
    check: [],
  })
  constructor(private _fb: FormBuilder) {}

  ngOnInit() {}
}
