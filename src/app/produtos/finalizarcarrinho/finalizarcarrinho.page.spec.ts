import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinalizarcarrinhoPage } from './finalizarcarrinho.page';

describe('FinalizarcarrinhoPage', () => {
  let component: FinalizarcarrinhoPage;
  let fixture: ComponentFixture<FinalizarcarrinhoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarcarrinhoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinalizarcarrinhoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
