import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnviaFeedbackPage } from './envia-feedback.page';

describe('EnviaFeedbackPage', () => {
  let component: EnviaFeedbackPage;
  let fixture: ComponentFixture<EnviaFeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviaFeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnviaFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
