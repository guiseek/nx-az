import {
  Component,
  ContentChild,
  AfterContentInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core'
import { FireAuthService } from '@nx-fire/auth'
import { Subject } from 'rxjs'
import { filter, takeUntil } from 'rxjs/operators'

import { FeatAuthFormComponent } from '../feat-auth-form'

@Component({
  selector: 'nx-feat-auth',
  templateUrl: './feat-auth.component.html',
  styleUrls: ['./feat-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatAuthComponent implements AfterContentInit, OnDestroy {
  destroy$ = new Subject<void>()
  @ContentChild(FeatAuthFormComponent) feat!: FeatAuthFormComponent

  @Output() authenticated = new EventEmitter()

  ngAfterContentInit() {
    console.log('this.feat: ', this.feat)
    this.feat.submitted
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.feat.form.valid)
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.destroy$.complete()
  }
}
