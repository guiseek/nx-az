import { NgModule } from '@angular/core'
import { IconComponent } from './icon.component'

export * from './icons'
export * from './default-icons'
export * from './icon-registry'
export * from './icon.component'

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class IconModule {}
