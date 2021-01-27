import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DatumComponent } from './datum.component';

describe('DatumComponent', () => {
  let component: DatumComponent;
  let fixture: ComponentFixture<DatumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatumComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init input fields by date', fakeAsync(() => {
    expect((component.dayInput.nativeElement as HTMLInputElement).value).toMatch('');
    expect((component.monthInput.nativeElement as HTMLInputElement).value).toMatch('');
    expect((component.yearInput.nativeElement as HTMLInputElement).value).toMatch('');
    component.writeValue(new Date(Date.UTC(2018, 11, 18)));
    fixture.detectChanges();
    tick();
    expect((component.dayInput.nativeElement as HTMLInputElement).value).toEqual('18');
    expect((component.monthInput.nativeElement as HTMLInputElement).value).toEqual('12');
    expect((component.yearInput.nativeElement as HTMLInputElement).value).toEqual('2018');
  }));

  describe('#onKeyUpDay, -Month, -Year', () => {
    it('should focus month field when using left arrow on year input', () => {
      component.onYearKeyUp(drueckeTaste('ArrowLeft'));
      expect(document.activeElement).toBe(component.monthInput.nativeElement);
    });

    it('should focus day field when using right arrow on year input', () => {
      component.onYearKeyUp(drueckeTaste('ArrowRight'));
      expect(document.activeElement).toBe(component.dayInput.nativeElement);
    });

    it('should focus year field when using right arrow on month input', () => {
      component.onMonthKeyUp(drueckeTaste('ArrowRight'));
      expect(document.activeElement).toBe(component.yearInput.nativeElement);
    });

    it('should focus day field when using left arrow on month input', () => {
      component.onMonthKeyUp(drueckeTaste('ArrowLeft'));
      expect(document.activeElement).toBe(component.dayInput.nativeElement);
    });

    it('should focus month field when using right arrow on day input', () => {
      component.onDayKeyUp(drueckeTaste('ArrowRight'));
      expect(document.activeElement).toBe(component.monthInput.nativeElement);
    });

    it('should focus year field when using left arrow on day input', () => {
      component.onDayKeyUp(drueckeTaste('ArrowLeft'));
      expect(document.activeElement).toBe(component.yearInput.nativeElement);
    });

    it('should focus month on day completion', () => {
      component.date.day = '01';
      component.onDayKeyUp(new KeyboardEvent('focusin'));
      expect(document.activeElement).toBe(component.monthInput.nativeElement);
    });

    it('should focus year on month completion', () => {
      component.date.month = '01';
      component.onMonthKeyUp(new KeyboardEvent('focusin'));
      expect(document.activeElement).toBe(component.yearInput.nativeElement);
    });
  });

  describe('#isCompleted ', () => {
    it('should be completed', () => {
      component.date = {
        day: '01',
        month: '01',
        year: '1994'
      };
      expect(component.isCompleted()).toBe(true);
    });
    it('should not be completed', () => {
      component.date = {
        day: '1',
        month: '1',
        year: '1994'
      };
      expect(component.isCompleted()).toBe(false);
      component.date = {
        day: '01',
        month: '01',
        year: ''
      };
      expect(component.isCompleted()).toBe(false);
    });
  });

  describe('#fillDate', () => {
    it('should not fill day', () => {
      component.date.day = '01';
      component.fillDay();
      expect(component.date.day).toBe('01');
    });
    it('should fill day', () => {
      component.date.day = '1';
      component.fillDay();
      expect(component.date.day).toBe('01');
    });
  });

  describe('#fillMonth', () => {
    it('should not fill month', () => {
      component.date.month = '01';
      component.fillMonth();
      expect(component.date.month).toBe('01');
    });
    it('should fill month', () => {
      component.date.month = '1';
      component.fillMonth();
      expect(component.date.month).toBe('01');
    });
  });

  describe('#fillYear', () => {
    it('should not fill year', () => {
      component.date.year = '1994';
      component.fillYear();
      expect(component.date.year).toBe('1994');
    });
    it('should fill year with last century', () => {
      component.date.year = '90';
      component.fillYear();
      expect(component.date.year).toBe('1990');
    });
    it('should fill year with this century', () => {
      component.date.year = '01';
      component.fillYear();
      expect(component.date.year).toBe('2001');
    });
  });

  it('should publish correct date in UTC', (done) => {
    const testDate = new Date();
    testDate.setUTCFullYear(1980, 2, 1);
    testDate.setUTCHours(0, 0, 0, 0);
    component.registerOnChange((data: any) => {
      expect(data).toEqual(testDate);
      done();
    });
    component.writeValue(new Date(1980, 2, 1));
    component.onInputKeyUp();
  });

  it('should write data into model', () => {
    const day = component.dayInput.nativeElement;
    const month = component.monthInput.nativeElement;
    const year = component.yearInput.nativeElement;
    day.value = '11';
    month.value = '12';
    year.value = '1990';
    day.dispatchEvent(new Event('input'));
    month.dispatchEvent(new Event('input'));
    year.dispatchEvent(new Event('input'));
    expect(component.date.day).toEqual('11');
    expect(component.date.month).toEqual('12');
    expect(component.date.year).toEqual('1990');
  });

  it('should be disableable', async () => {
    component.setDisabledState(true);
    component.disabled = true;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.dayInput.nativeElement.disabled).toBe(true);
    expect(component.monthInput.nativeElement.disabled).toBe(true);
    expect(component.yearInput.nativeElement.disabled).toBe(true);
  });

  function drueckeTaste(key: string): KeyboardEvent {
    return new KeyboardEvent('keydown', {key});
  }

});
