import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable:no-use-before-declare */
  useExisting: forwardRef(() => RadiobuttonComponent),
  /* tslint:enable:no-use-before-declare */
  multi: true
};

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class RadiobuttonComponent implements ControlValueAccessor {

  @Input() id!: string;
  @Input() name!: string;
  @Input() value!: string | boolean;
  @Input() label!: string;
  @Input() disabled = false;

  public onChange!: (value: string | boolean) => void;
  public onTouched!: () => void;
  activeValue = '';

  constructor() {
  }

  changeValue() {
    this.onChange(this.value);
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

  writeValue(newValue: string): void {
    this.activeValue = newValue;
  }


}
