import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { CheckComponent, CheckGroupComponent } from './check.component'
import { IconModule } from '../icon'

export * from './check.component'

@NgModule({
  imports: [CommonModule, IconModule, ReactiveFormsModule],
  declarations: [CheckComponent, CheckGroupComponent],
  exports: [CheckComponent, CheckGroupComponent],
})
export class CheckModule {}
