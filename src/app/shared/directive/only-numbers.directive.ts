import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class OnlynumberDirective {

  private readonly regex: RegExp = new RegExp(/^[0-9]+$/g);
  private readonly specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', 'Escape', 'Enter'];
  private readonly ctrlKeys: Array<string> = ['a', 'c', 'v', 'x'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow: SpecialKeys
    if (this.specialKeys.indexOf(event.key) !== -1
      // and Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      || (event.ctrlKey && this.ctrlKeys.indexOf(event.key?.toLowerCase()) !== -1)) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
