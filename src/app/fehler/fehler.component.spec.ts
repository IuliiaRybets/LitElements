import { FehlerComponent } from './fehler.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TerminvereinbarenService } from '@core/service/terminvereinbaren/terminvereinbaren.service';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { instance, mock, verify } from 'ts-mockito';

describe('FehlerComponent', () => {
  let component: FehlerComponent;
  let fixture: ComponentFixture<FehlerComponent>;
  let terminServiceMock: TerminvereinbarenService;
  let page: Page;

  beforeEach(async(() => {
    terminServiceMock = mock(TerminvereinbarenService);

    TestBed.configureTestingModule({
      declarations: [ FehlerComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: TerminvereinbarenService, useFactory: () => instance(terminServiceMock)},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerComponent);
    page = new Page(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call TerminvereinbarenService onTerminVereinbaren', () => {
    page.terminVereinbaren();

    verify(terminServiceMock.onTerminvereinbaren()).called();
  });
});

class Page {
  constructor(private readonly fixture: ComponentFixture<FehlerComponent>) {
  }

  terminVereinbaren() {
    this.fixture.debugElement.query(By.css('#terminvereinbaren')).nativeElement.click();
    return this;
  }
}
