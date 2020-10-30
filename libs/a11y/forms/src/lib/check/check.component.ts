import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ChangeDetectorRef,
  AfterContentInit,
  OnDestroy,
  ContentChildren,
  QueryList,
  Optional,
  Self,
  OnInit,
  ContentChild,
  ViewChild,
  ElementRef,
  DoCheck,
  Injectable,
  HostBinding,
} from '@angular/core'
import {
  ControlValueAccessor,
  NgControl,
  NgForm,
  FormGroupDirective,
  FormControl,
} from '@angular/forms'
import { Subject, Subscription } from 'rxjs'
import { LabelComponent } from '../label'
import { ErrorStateMatcher } from '../utils'

let nextId = 0

export class CheckChangeEvent {
  constructor(
    /** The checked value of the check. */
    public checked: boolean,
    /** The value of the check. */
    public value: string,
    /** The component instance of the check which emitted the change event. */
    public check: CheckComponent
  ) {}
}

export class CheckGroupChangeEvent {
  constructor(
    /** The value of the check group. An array containing all checked check values. */
    public value: string[],
    /** The component instance of the check group. */
    public checkGroup: CheckGroupComponent
  ) {}
}

/** Size of the label. */
export type CheckLabelSize = 'small' | 'large'

@Component({
  selector: 'nx-check-group',
  templateUrl: 'check-group.component.html',
  styleUrls: ['check-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckGroupComponent
  implements ControlValueAccessor, AfterContentInit, OnDestroy, DoCheck {
  @HostBinding('class.nx-check-group')
  checkGroup = true

  @HostBinding('class.nx-check-group--negative')
  get checkGroupNegative() {
    return this.negative
  }

  @HostBinding('attr.aria-labelledby')
  get ariaLabelledby() {
    return this._label?.id || null
  }

  @HostBinding('attr.role')
  role = 'group'

  /** Sets the Id of the check group. */
  @Input()
  @HostBinding('id')
  set id(value: string) {
    if (this._id !== value) {
      this._id = value
      this._changeDetectorRef.markForCheck()
    }
  }

  get id(): string {
    return this._id
  }
  /** Sets the name of the checkes inside the nx-check-group. */
  @Input()
  set name(value: string) {
    this._name = value
    this._changeDetectorRef.markForCheck()
  }

  get name(): string {
    return this._name
  }

  /** Disables all checkes inside the nx-check-group. */
  @Input()
  @HostBinding('attr.disabled')
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value)
    if (this._label) {
      this._label.disabled = this._disabled
    }
    this._stateChanges.next()
  }

  get disabled(): boolean {
    return this._disabled
  }
  /** Set the negative styles for all the checkes inside the nx-check-group */
  @Input()
  set negative(value: boolean) {
    this._negative = coerceBooleanProperty(value)
    this._changeDetectorRef.markForCheck()
    this._stateChanges.next()
  }

  get negative(): boolean {
    return this._negative
  }
  /** Sets the label size of the checkes inside the group */
  @Input()
  set labelSize(value: CheckLabelSize) {
    this._labelSize = value
    this._stateChanges.next()
  }

  get labelSize(): CheckLabelSize {
    return this._labelSize
  }

  /** Whether the nx-check-group are required. */
  @Input()
  @HostBinding('attr.required')
  get required(): boolean {
    return this._required
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value)
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _errorStateMatcher: ErrorStateMatcher,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this
    }
  }

  /** Checkbox instances in the check group. */
  get checkes(): CheckComponent[] {
    return this._checkes.toArray()
  }

  // static ngAcceptInputType_disabled: BooleanInput
  static ngAcceptInputType_negative: BooleanInput
  static ngAcceptInputType_required: BooleanInput
  @ContentChildren(forwardRef(() => CheckComponent), { descendants: true })
  _checkes!: QueryList<CheckComponent>

  @ContentChild(forwardRef(() => LabelComponent))
  _label!: LabelComponent

  readonly _stateChanges = new Subject<void>()
  errorState = false
  @Output() selectionChange: EventEmitter<
    CheckGroupChangeEvent
  > = new EventEmitter<CheckGroupChangeEvent>()

  private _id = `nx-check-group-${nextId++}`

  private _name!: string

  private _disabled = false

  private _negative = false

  private _labelSize!: CheckLabelSize

  private _required!: boolean

  private _value!: any[]

  ngAfterContentInit() {
    setTimeout(() => {
      this._updateSelectedCheckboxFromValue()
    })

    this._checkes.changes.subscribe(() => {
      this._value = this._checkes
        .filter((check) => check.checked)
        .map((cb) => cb.value)

      if (this.ngControl) {
        this.ngControl?.control?.setValue(this._value)
      }
      this._updateSelectedCheckboxFromValue()
    })
  }

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState()
    }
  }

  ngOnDestroy() {
    this._stateChanges.complete()
  }

  writeValue(value: any): void {
    if (this._value !== value) {
      this._value = value
      this._updateSelectedCheckboxFromValue()
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  private _onChange: (value: any) => void = () => {}

  private _onTouched: () => any = () => {}

  private _updateSelectedCheckboxFromValue(): void {
    if (
      this._checkes &&
      this._checkes.length &&
      !!this._value &&
      this._value.length
    ) {
      this._checkes.map((check) => {
        check.checked = this._value.indexOf(check.value) !== -1
      })
    }
  }

  /** @docs-private */
  change(value: any) {
    const checkedCheckboxValues = this._checkes
      .filter((check) => check.checked)
      .map((check) => check.value)
    this._onChange(checkedCheckboxValues)

    if (this._onTouched) {
      this._onTouched()
    }

    this.selectionChange.emit(
      new CheckGroupChangeEvent(checkedCheckboxValues, this)
    )
  }

  /** @docs-private */
  updateErrorState() {
    const oldState = this.errorState
    const parent = this._parentFormGroup || this._parentForm
    const control = this.ngControl
      ? (this.ngControl.control as FormControl)
      : null
    const newState = this._errorStateMatcher.isErrorState(control, parent)

    if (newState !== oldState) {
      this.errorState = newState
      this._changeDetectorRef.markForCheck()
    }
  }
}

@Component({
  selector: 'nx-check',
  templateUrl: 'check.component.html',
  styleUrls: ['check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckComponent implements ControlValueAccessor, OnDestroy, OnInit {
  @HostBinding('class.nx-check') check = true

  @HostBinding('class.nx-check--label-small')
  get labelSmall() {
    return this.labelSize === 'small'
  }

  @HostBinding('class.nx-check--label-large')
  get labelLarge() {
    return this.labelSize === 'large'
  }

  @HostBinding('class.nx-check--negative')
  get checkNegative() {
    return this.negative
  }

  @HostBinding('class.has-error')
  get hasError() {
    return this._controlInvalid() || null
  }

  @HostBinding('attr.aria-invalid')
  get ariaInvalid() {
    return this._controlInvalid() || null
  }

  /**
   * Id of the check.
   *
   * If not set, the check gets an incremented value by default.
   */
  @Input()
  set id(value: string) {
    if (value !== this._id) {
      this._id = value
      this._changeDetectorRef.markForCheck()
    }
  }

  get id() {
    return `nx-check-${this._id}`
  }

  /** Name of the check. */
  @Input()
  set name(name: string | null) {
    this._name = name
  }

  get name(): string | null {
    return this.checkGroup && this.checkGroup.name
      ? this.checkGroup.name
      : this._name
  }

  /** Whether the check is disabled. */
  @Input()
  @HostBinding('attr.disabled')
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value)
    if (newValue !== this._disabled) {
      this._disabled = newValue
      this._changeDetectorRef.markForCheck()
    }
  }

  get disabled(): boolean {
    return this.checkGroup && this.checkGroup.disabled
      ? this.checkGroup.disabled
      : this._disabled
  }

  /**
   * Sets the label size of the check. Default value: small
   */
  @Input()
  set labelSize(value: CheckLabelSize) {
    this._labelSize = value
    this._changeDetectorRef.markForCheck()
  }

  get labelSize(): CheckLabelSize {
    return this.checkGroup && this.checkGroup.labelSize
      ? this.checkGroup.labelSize
      : this._labelSize
  }

  /**
   * Whether the check has negative styling.
   */
  @Input()
  set negative(value: boolean) {
    const newValue = coerceBooleanProperty(value)
    if (newValue !== this._negative) {
      this._negative = newValue
      this._changeDetectorRef.markForCheck()
    }
  }

  get negative(): boolean {
    return this.checkGroup && this.checkGroup.negative
      ? this.checkGroup.negative
      : this._negative
  }

  /** Whether the check is checked. */
  @Input()
  set checked(value: boolean) {
    const newValue = coerceBooleanProperty(value)
    if (newValue !== this._checked) {
      if (this._indeterminate) {
        this._setIndeterminate(false)
      }
      this._setChecked(newValue)
    }
  }

  get checked() {
    return this._checked
  }

  /** Whether the check is indeterminated. */
  @Input()
  set indeterminate(value: boolean) {
    const newValue = coerceBooleanProperty(value)
    if (this._indeterminate !== newValue) {
      if (this._checked) {
        this._setChecked(false)
      }
      this._setIndeterminate(newValue)
    }
    this._changeDetectorRef.markForCheck()
  }

  get indeterminate() {
    return this._indeterminate
  }

  /** Whether the check is required. */
  @Input()
  @HostBinding('attr.required')
  get required(): boolean {
    return this._required
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value)
  }

  /** Sets the value of the check. Default value is the checked status. */
  @Input()
  get value(): string {
    return this._value ? this._value : this.checked.toString()
  }

  set value(value: string) {
    this._value = value
    this._changeDetectorRef.markForCheck()
  }

  /** @docs-private */
  get labelHasContent() {
    return !!this._checkLabelWrapper?.nativeElement.innerHTML.trim()
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _errorStateMatcher: ErrorStateMatcher,
    @Optional() public checkGroup: CheckGroupComponent,
    @Self() @Optional() public ngControl: NgControl,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective
  ) {
    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this
    }
  }

  // static ngAcceptInputType_disabled: BooleanInput
  static ngAcceptInputType_negative: BooleanInput
  static ngAcceptInputType_checked: BooleanInput
  static ngAcceptInputType_indeterminate: BooleanInput
  static ngAcceptInputType_required: BooleanInput
  private _parentChangeSubscription!: Subscription
  private _id: string = (nextId++).toString()
  private _disabled = false
  private _negative = false
  private _labelSize: CheckLabelSize = 'small'
  private _checked = false
  private _name: string | null = null

  /** @docs-private */
  /** @docs-private */

  @ViewChild('checkLabelWrapper', { static: true })
  _checkLabelWrapper!: ElementRef

  private _indeterminate = false

  private _required!: boolean

  private _value!: string

  /** An event emitted when the indeterminate value has changed */
  @Output()
  indeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>(false)

  /** An event emitted when the checked value has changed.
   *
   * Emits the boolean checked value of the changed check.
   */
  @Output()
  checkedChange = new EventEmitter<boolean>(false)

  /** An event emitted when the checked value has changed.
   *
   * Emits a CheckChangeEvent.
   */
  @Output()
  checkChange: EventEmitter<CheckChangeEvent> = new EventEmitter<
    CheckChangeEvent
  >()

  /** @docs-private
   * Callback for when the content of the label has changed.
   */
  labelContentChanged() {
    this._changeDetectorRef.detectChanges()
  }

  /** @docs-private */
  _controlInvalid(): boolean {
    const parent = this._parentFormGroup || this._parentForm
    let control = null

    if (this.checkGroup && this.checkGroup.ngControl) {
      control = this.checkGroup.ngControl
    } else {
      control = this.ngControl ? (this.ngControl.control as FormControl) : null
    }

    return this._errorStateMatcher.isErrorState(control, parent)
  }

  ngOnInit() {
    if (this.checkGroup) {
      this.name = this.checkGroup.name
      // when relevant properties of the parent like name and disabled change
      // we need to let change detection know that the template needs an update
      this._parentChangeSubscription = this.checkGroup._stateChanges.subscribe(
        () => {
          this._changeDetectorRef.markForCheck()
        }
      )
    }
  }

  ngOnDestroy() {
    if (this._parentChangeSubscription) {
      this._parentChangeSubscription.unsubscribe()
    }
  }

  private _setIndeterminate(value: boolean) {
    this._indeterminate = value
    this.indeterminateChange.emit(this._indeterminate)
    this._changeDetectorRef.markForCheck()
  }

  private _setChecked(value: boolean) {
    this._checked = value
    this._changeDetectorRef.markForCheck()
  }

  /** Toggles the checked state of the check. */
  public toggle() {
    this.checked = !this.checked
    this.onChangeCallback(this.checked)
    if (this.checkGroup !== null) {
      this.checkGroup.change(this)
    }
  }

  writeValue(value: any): void {
    if (value === null) {
      value = false
    }
    if (value !== this.checked) {
      this.checked = value
    }
  }

  private onChangeCallback = (_: any) => {}

  registerOnChange(onChange: any): void {
    this.onChangeCallback = onChange
  }

  private onTouchedCallback = () => {}

  registerOnTouched(onTouched: any): void {
    this.onTouchedCallback = onTouched
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  /** @docs-private */
  touch() {
    this.onTouchedCallback()
  }

  /** @docs-private */
  _onInputClick(event: Event): void {
    // stop the propagation of the native click on the check input so that a click is not triggered twice
    event.stopPropagation()
    if (!this.disabled) {
      this.toggle()
      this.checkedChange.emit(this._checked)
      this.checkChange.emit(this._createChangeEvent(this._checked))
    }
  }

  /**@docs-private */
  private _createChangeEvent(checkedValue: boolean): CheckChangeEvent {
    const event = new CheckChangeEvent(checkedValue, this.value, this)
    event.checked = checkedValue
    event.value = this.value
    event.check = this
    return event
  }
}
