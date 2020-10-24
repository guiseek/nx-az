import {
  Component,
  Directive,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { FeatAuthContainer } from '@nx-feat/auth'
import { AuthWithEmailAndPassword } from '@nx-fire/auth'

@Component({
  selector: 'exp-form, [exp-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent extends FeatAuthContainer implements OnInit {
  form: HTMLElement
  formControls: FormControl[]

  loading$ = this.loading$
  // @Input() formGroup

  @Output() nxSubmit = new EventEmitter()

  ngGroup = new FormGroup({})

  ngOnInit(): void {
    // console.log(this.ngGroup);
    // this.ngGroup.gr
  }

  onSubmit(credential: AuthWithEmailAndPassword) {
    console.log(credential)
    this._fa.login(credential)
  }
}
