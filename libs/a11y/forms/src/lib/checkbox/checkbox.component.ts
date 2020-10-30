import {
  Self,
  Input,
  Output,
  Optional,
  OnDestroy,
  ViewChild,
  Component,
  ElementRef,
  forwardRef,
  Injectable,
  EventEmitter,
  AfterContentInit,
  ChangeDetectionStrategy,
  Renderer2,
} from '@angular/core'
import {
  NG_VALUE_ACCESSOR,
  AbstractControl,
  FormControl,
  NgControl,
} from '@angular/forms'
import { ControlAccessor } from '../control-accessor'
import { EventTargetAs } from '@nx-util/types'
import { Subject } from 'rxjs'

// @Injectable()
export class CheckboxAccessor extends ControlAccessor {}

const CheckboxProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxAccessor),
  multi: true,
}

let nextId = 0

@Component({
  selector: 'nx-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CheckboxAccessor, CheckboxProvider],
})
export class CheckboxComponent extends CheckboxAccessor
  implements AfterContentInit, OnDestroy {
  destroy$ = new Subject<void>()

  @ViewChild('input', { static: true }) _el!: ElementRef<HTMLInputElement>
  get el() {
    return this._el.nativeElement
  }

  private _id = `form-checkbox-${nextId++}`
  private _indeterminate = false

  @Input()
  public set value(value: any) {
    this._value = value
  }
  public get value(): any {
    return this._value
  }

  @Input()
  public set id(value: string) {
    this._id = value
  }
  public get id(): string {
    return this._id
  }

  @Input()
  public set indeterminate(state: boolean) {
    this.el.indeterminate = state
    this._indeterminate = state
  }
  public get indeterminate(): boolean {
    return this._indeterminate
  }

  @Input()
  public set disabled(value: boolean) {
    this._disabled = value
  }

  @Output()
  valueChange = new EventEmitter<any>()

  @Output()
  checkedChange = new EventEmitter<CheckboxComponent>()

  control!: FormControl

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private renderer: Renderer2
  ) {
    super()
  }

  ngAfterContentInit() {
    this.control = this.ngControl?.control
      ? (this.ngControl?.control as FormControl)
      : new FormControl()
  }

  onChangeEvent({ target }: EventTargetAs<HTMLInputElement>) {
    const value = this.normalizeValue(target.value)

    if (target.checked) {
      this.control.setValue(value)
      this.renderer.setProperty(this.el, 'checked', value)
    } else {
      this.control.setValue(false)
    }

    this.onChange(value)

    this.checkedChange.emit(this)
    this.valueChange.emit(target.value)
  }

  normalizeValue(value = '') {
    return value !== 'undefined' ? value : !!value
  }

  ngOnDestroy() {
    this.destroy$.complete()
  }
}
