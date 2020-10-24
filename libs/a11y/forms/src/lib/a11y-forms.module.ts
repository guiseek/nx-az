import { NgModule } from '@angular/core'
import { CheckboxModule } from './checkbox/checkbox.module'

export * from './checkbox/checkbox.module'

@NgModule({
  exports: [CheckboxModule],
})
export class A11yFormsModule {}
