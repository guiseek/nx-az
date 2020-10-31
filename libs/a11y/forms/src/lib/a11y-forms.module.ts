import { NgModule } from '@angular/core'
import { CheckboxModule } from './checkbox'
import { CheckModule } from './check'
import { LabelModule } from './label'
import { IconModule } from './icon'
import { PhoneModule } from './phone'

@NgModule({
  exports: [CheckboxModule, CheckModule, LabelModule, PhoneModule, IconModule],
  declarations: [],
})
export class A11yFormsModule {}
