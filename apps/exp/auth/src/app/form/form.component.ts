import { Component } from '@angular/core'
import { FeatAuthContainer } from '@nx-feat/auth'
import { AuthWithEmailAndPassword } from '@nx-fire/auth'

@Component({
  selector: 'exp-form, [exp-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent extends FeatAuthContainer {
  onSubmit(credential: AuthWithEmailAndPassword) {
    this._fa.login(credential)
  }
}
