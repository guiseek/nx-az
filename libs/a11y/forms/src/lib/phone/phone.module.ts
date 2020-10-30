import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PhoneComponent } from './phone.component'

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [PhoneComponent],
  exports: [PhoneComponent],
})
export class PhoneModule {}
