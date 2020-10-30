import { NgModule } from '@angular/core'
import { CheckboxModule } from './checkbox/checkbox.module'
import { CheckModule } from './check/check.module'
import { LabelModule } from './label'
import { IconModule } from './icon'
import { PhoneModule } from './phone'

export * from './icon/icon.module'
export * from './phone/phone.module'
export * from './label/label.module'
export * from './check/check.module'
export * from './checkbox/checkbox.module'

@NgModule({
  exports: [CheckboxModule, CheckModule, LabelModule, PhoneModule, IconModule],
  declarations: [],
})
export class A11yFormsModule {}
