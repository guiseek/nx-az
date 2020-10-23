import { AuthLoginDb } from '@nx-core/data'
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { FireAuthService } from '@nx-fire/auth'
import { Subject } from 'rxjs'

@Component({ template: ``, changeDetection: ChangeDetectionStrategy.OnPush })
export class FeatAuthContainer implements OnDestroy {
  destroy$ = new Subject<void>()

  loading$ = this._fa.loading$

  error$ = this._fa.error$

  user$ = this._fa.user$

  // constructor(protected _fa: FireAuthService) {
  constructor(protected _fa: FireAuthService) {
    console.log(_fa)
  }

  ngOnDestroy() {
    this.destroy$.complete()
  }
}
