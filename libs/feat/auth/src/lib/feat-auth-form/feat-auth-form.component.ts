import {
  OnInit,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core'
import { Subject } from 'rxjs'
import { debounceTime, takeUntil } from 'rxjs/operators'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthWithEmailAndPassword } from '@nx-fire/auth'

@Component({
  selector: 'nx-feat-auth-form',
  templateUrl: './feat-auth-form.component.html',
  styleUrls: ['./feat-auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatAuthFormComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>()

  form = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  @Output() submitted = new EventEmitter<AuthWithEmailAndPassword>()

  @Output() changed = new EventEmitter<Partial<AuthWithEmailAndPassword>>()

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroy$))
      .subscribe((value) => this.changed.emit(value))
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.submitted.emit(this.form.value)
    }
  }

  ngOnDestroy() {
    this.destroy$.complete()
  }
}
