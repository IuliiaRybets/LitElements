import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable:no-use-before-declare */
  useExisting: forwardRef(() => CheckboxComponent),
  /* tslint:enable:no-use-before-declare */
  multi: true
};

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor {

  @Input() id!: string;
  @Input() name!: string;
  @Input() label!: string;
  @Input() disabled = false;
  @Input() required? = false;

  public onChange: (value: boolean) => void;
  public onTouched: () => void;
  public internalValue = false;

  constructor() {
  }

  changeValue(event: any) {
    this.internalValue = event.target.checked;
    this.onChange(this.internalValue);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(newValue: boolean): void {
    this.internalValue = newValue;
  }
}
