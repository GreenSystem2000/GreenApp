import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConcluidoPage } from './concluido.page';

describe('ConcluidoPage', () => {
  let component: ConcluidoPage;
  let fixture: ComponentFixture<ConcluidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcluidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConcluidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
