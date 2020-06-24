import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelaPedidoPage } from './cancela-pedido.page';

describe('CancelaPedidoPage', () => {
  let component: CancelaPedidoPage;
  let fixture: ComponentFixture<CancelaPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelaPedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelaPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
