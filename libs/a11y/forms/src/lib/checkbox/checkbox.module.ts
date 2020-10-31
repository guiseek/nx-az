import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckboxComponent } from './checkbox.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

export * from './checkbox.component'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
