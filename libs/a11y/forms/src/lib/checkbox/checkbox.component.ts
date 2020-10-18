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

@Injectable()
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
  public set disabled(value: boolean) {
    this._disabled = value
  }

  @Output()
  valueChange = new EventEmitter<any>()

  @Output()
  checkedChange = new EventEmitter<CheckboxComponent>()

  control!: AbstractControl

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super()
  }

  ngAfterContentInit() {
    this.control = this.ngControl?.control
      ? this.ngControl?.control
      : new FormControl()
  }

  onChangeEvent({ target }: EventTargetAs<HTMLInputElement>) {
    if (target.value && target.value !== 'undefined') {
      this.onChange(target.value)
    }
    this.checkedChange.emit(this)
    this.valueChange.emit(target.value)
  }

  ngOnDestroy() {
    this.destroy$.complete()
  }
}
