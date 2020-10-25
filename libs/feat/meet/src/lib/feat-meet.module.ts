import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatButtonModule } from '@angular/material/button'

import { FeatMeetComponent } from './feat-meet/feat-meet.component'

export * from './feat-meet/feat-meet.component'

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [FeatMeetComponent],
  exports: [FeatMeetComponent],
})
export class FeatMeetModule {}
