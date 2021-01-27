import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable:no-use-before-declare */
  useExisting: forwardRef(() => ToggleComponent),
  /* tslint:enable:no-use-before-declare */
  multi: true
};

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class ToggleComponent implements ControlValueAccessor {

  @Input() id: string;
  @Input() name: string;
  @Input() labelLeft: string;
  @Input() labelRight: string;
  @Input() valueLeft: any;
  @Input() valueRight: any;

  public onChange: (value: any) => void;
  public onTouched: () => void;
  public internalValue = '';

  constructor() {
  }

  change(value: any) {
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(newValue: any): void {
    this.internalValue = newValue;
  }

}
