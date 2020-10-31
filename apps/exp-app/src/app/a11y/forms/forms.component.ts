import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'nx-az-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  public phoneForm: FormGroup
  public optionsForm: FormGroup
  public myFormGroup: FormGroup

  public logMessage: string
  public messages = []

  createForm() {
    this.phoneForm = this.fb.group({
      tel: [],
    })

    this.myFormGroup = this.fb.group({
      terms: [[]],
    })

    this.optionsForm = this.fb.group({
      isNegative: [false, null],
      isRequired: [false, null],
      isDisabled: [false, null],
      isLarge: [false, null],
      isLabelExpert: [false, null],
    })
  }

  toggleDisabled() {
    const checkboxGroup = this.myFormGroup.get('terms')
    if (checkboxGroup.disabled) {
      this.myFormGroup.get('terms').enable()
    } else {
      this.myFormGroup.get('terms').disable()
    }
  }

  toggleRequired() {
    const checkboxGroup = this.myFormGroup.get('terms')
    if (checkboxGroup.validator === Validators.required) {
      checkboxGroup.clearValidators()
    } else {
      checkboxGroup.setValidators(Validators.required)
    }
  }

  public log(value) {
    this.messages.push(value)
    this.logMessage = this.messages.join('\n')
  }

  ngOnInit() {}
}
