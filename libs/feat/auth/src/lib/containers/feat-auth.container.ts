import { AuthUseCase } from '@nx-core/domain'
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  template: ``,
  providers: [AuthUseCase],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatAuthContainer implements OnDestroy {
  destroy$ = new Subject<void>()

  loading$ = this._fa.loading$

  error$ = this._fa.error$

  user$ = this._fa.user$

  constructor(protected _fa: AuthUseCase) {
    // constructor(protected _fa: FireAuthService) {
    console.log(_fa)
  }

  ngOnDestroy() {
    this.destroy$.complete()
  }
}
