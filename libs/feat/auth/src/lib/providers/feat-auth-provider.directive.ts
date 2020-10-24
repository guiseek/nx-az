import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core'

@Directive({
  selector: '[nx-feat-auth-provider]',
})
export class FeatAuthProviderDirective {
  @HostBinding('class.auth-provider')
  authProviderClass = true

  @Output()
  clicked = new EventEmitter()

  @HostListener('click')
  onClicked() {
    this.clicked.emit()
  }

  constructor() {}
}
