import { FocusMonitor } from '@angular/cdk/a11y'
import { coerceBooleanProperty } from '@angular/cdk/coercion'
import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core'
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms'
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field'
import { Subject } from 'rxjs'

/** Data structure for holding telephone number. */
export class Phone {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string
  ) {}
}

@Component({
  selector: 'nx-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: PhoneComponent }],
  // host: {
  // '[class.example-floating]': 'shouldLabelFloat',
  // '[id]': 'id',
  // },
})
export class PhoneComponent
  implements ControlValueAccessor, MatFormFieldControl<Phone>, OnDestroy {
  @HostBinding('class.example-floating')
  get floating() {
    return this.shouldLabelFloat
  }

  get empty() {
    const {
      value: { area, exchange, subscriber },
    } = this.parts

    return !area && !exchange && !subscriber
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty
  }

  @Input()
  get placeholder(): string {
    return this._placeholder
  }
  set placeholder(value: string) {
    this._placeholder = value
    this.stateChanges.next()
  }

  @Input()
  get required(): boolean {
    return this._required
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value)
    this.stateChanges.next()
  }

  @Input()
  get disabled(): boolean {
    return this._disabled
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value)
    this._disabled ? this.parts.disable() : this.parts.enable()
    this.stateChanges.next()
  }

  @Input()
  get value(): Phone | null {
    if (this.parts.valid) {
      const {
        value: { area, exchange, subscriber },
      } = this.parts
      return new Phone(area, exchange, subscriber)
    }
    return null
  }
  set value(tel: Phone | null) {
    const { area, exchange, subscriber } = tel || new Phone('', '', '')
    this.parts.setValue({ area, exchange, subscriber })
    this.stateChanges.next()
  }

  get errorState(): boolean {
    return this.parts.invalid && this.parts.dirty
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.parts = formBuilder.group({
      area: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      exchange: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      subscriber: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    })

    _focusMonitor.monitor(_elementRef, true).subscribe((origin) => {
      if (this.focused && !origin) {
        this.onTouched()
      }
      this.focused = !!origin
      this.stateChanges.next()
    })

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this
    }
  }
  static nextId = 0

  // tslint:disable-next-line: member-ordering
  static ngAcceptInputType_disabled: boolean | string | null | undefined
  static ngAcceptInputType_required: boolean | string | null | undefined
  @ViewChild('area') areaInput!: HTMLInputElement
  @ViewChild('exchange') exchangeInput!: HTMLInputElement
  @ViewChild('subscriber') subscriberInput!: HTMLInputElement

  parts: FormGroup
  stateChanges = new Subject<void>()
  focused = false
  controlType = 'example-tel-input'
  @Input()
  @HostBinding('id')
  id = `example-tel-input-${PhoneComponent.nextId++}`

  @Input()
  @HostBinding('attr.aria-describedby')
  userAriaDescribedBy!: string

  private _placeholder!: string
  private _required = false
  private _disabled = false
  onChange = (_: any) => {}
  onTouched = () => {}

  autoFocusNext(
    control: AbstractControl,
    nextElement?: HTMLInputElement
  ): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program')
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program')
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete()
    this._focusMonitor.stopMonitoring(this._elementRef)
  }

  setDescribedByIds(ids: string[]) {
    // tslint:disable-next-line: no-non-null-assertion
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.example-tel-input-container'
    )!
    controlElement.setAttribute('aria-describedby', ids.join(' '))
  }

  onContainerClick() {
    if (this.parts.controls.subscriber.valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program')
    } else if (this.parts.controls.exchange.valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program')
    } else if (this.parts.controls.area.valid) {
      this._focusMonitor.focusVia(this.exchangeInput, 'program')
    } else {
      this._focusMonitor.focusVia(this.areaInput, 'program')
    }
  }

  writeValue(tel: Phone | null): void {
    this.value = tel
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement)
    this.onChange(this.value)
  }
}
