import { Injectable } from '@angular/core'
import {
  FormControl,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms'

@Injectable({ providedIn: 'root' })
export class ErrorStateMatcher {
  isErrorState(
    control: FormControl | NgControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(
      control &&
      control.invalid &&
      (control.touched || (form && form.submitted))
    )
  }
}
