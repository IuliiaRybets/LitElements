import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment from 'moment';

class DateModel {
  constructor(public day: string,
              public month: string,
              public year: string
  ) {}
}

@Component({
  selector: 'app-datum',
  templateUrl: './datum.component.html',
  styleUrls: [ './datum.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatumComponent),
      multi: true
    }
  ]
})
export class DatumComponent implements ControlValueAccessor {

  @Input() isInvalid: boolean;
  @Input() disabled = false;
  date = new DateModel('', '', '');

  @ViewChild('day') dayInput: ElementRef;
  @ViewChild('month') monthInput: ElementRef;
  @ViewChild('year') yearInput: ElementRef;

  private propagateChange = Function.prototype;
  private propagateTouched = Function.prototype;

  writeValue(date: Date) {
    if (date === null) {
      return;
    }
    const temp = new Date(date);
    this.date.day = temp.toLocaleDateString('de-DE', {day: '2-digit'});
    this.date.month = temp.toLocaleDateString('de-DE', {month: '2-digit'});
    this.date.year = temp.toLocaleDateString('de-DE', {year: 'numeric'});
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private publishData() {
    let result;
    if (this.isCompleted() &&
      moment([this.date.day, this.date.month, this.date.year].concat(), 'DD,MM,YYYY', true).isValid()) {
      result = new Date();
      result.setUTCFullYear(+this.date.year, +this.date.month - 1, +this.date.day);
      result.setUTCHours(0, 0, 0, 0);
    }
    this.propagateChange(result);
    this.propagateTouched();
  }

  onDayKeyUp(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.monthInput.nativeElement.focus();
    } else if (event.key === 'ArrowLeft') {
      this.yearInput.nativeElement.focus();
    } else if (this.date.day?.length === 2) {
        this.monthInput.nativeElement.focus();
    }
  }

  onMonthKeyUp(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.yearInput.nativeElement.focus();
    } else if (event.key === 'ArrowLeft') {
      this.dayInput.nativeElement.focus();
    } else if (this.date.month?.length === 2) {
      this.yearInput.nativeElement.focus();
    }
  }

  onYearKeyUp(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.monthInput.nativeElement.focus();
    } else if (event.key === 'ArrowRight') {
      this.dayInput.nativeElement.focus();
    }
  }

  onFocusLost() {
    setTimeout(() => {
      const isAnySubFieldSelected = document.activeElement === this.dayInput.nativeElement
        || document.activeElement === this.monthInput.nativeElement
        || document.activeElement === this.yearInput.nativeElement;
      if (isAnySubFieldSelected) {
        return;
      }
      this.publishData();
    });
  }

  onInputKeyUp() {
    if (!this.isCompleted()) {
      return;
    }
    this.publishData();
  }

  fillDay() {
    if (this.date.day?.length !== 1 || this.date.day === '0') {
      return;
    }
    this.date.day = '0' + this.date.day;
  }

  fillMonth() {
    if (this.date.month?.length !== 1 || this.date.month === '0') {
      return;
    } else {
      this.date.month = '0' + this.date.month;
    }
  }

  fillYear() {
    if (this.date.year?.length !== 2) {
      return;
    }
    const thisYear = new Date().getFullYear();
    const thisCentury = thisYear.toString().substr(2);
    const lastCentury = +thisCentury - 1;

    if (+this.date.year <= +thisYear.toString().substr(-2)) {
      this.date.year = thisCentury + this.date.year;
    }
    else {
      this.date.year = lastCentury + this.date.year;
    }
  }

  isCompleted() {
    return this.date.day?.length === 2 && this.date.month?.length === 2 && this.date.year?.length === 4;
  }
}
